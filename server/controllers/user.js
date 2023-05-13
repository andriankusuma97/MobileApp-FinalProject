const Hash = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Vehicle } = require("../models");
const ImageKit = require("imagekit");
const uuid = require("uuid");
const multer = require("multer");
const { priceFormatter } = require("../helpers/formatter");
const storage = multer.memoryStorage();
const upload = multer({ storage });

class UserController {
  static async register(req, res, next) {
    upload.any()(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({ error: "Error uploading files" });
      }
      const { name, address, email, phoneNumber, password } = req.body;

      const lcEmail = email.toLowerCase();

      const selfie = req.files.find((file) => file.fieldname === "photo");
      const idCard = req.files.find((file) => file.fieldname === "idCardImg");
      console.log(selfie, "photo");
      console.log(idCard, "id");
      var imagekit = new ImageKit({
        publicKey: "public_598ryvTcQKwiS8vjsgNTeEUsvfY=",
        privateKey: "private_8dPPtCNhJ11zMc2K2U/dQBJ6E5g=",
        urlEndpoint: "https://ik.imagekit.io/pckjztu2z",
      });
      try {
        const selfieUrl = await imagekit.upload({
          file: selfie.buffer, //required
          fileName: `${selfie.originalname}`, //required
          extensions: [
            {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95,
            },
          ],
        });

        const idCardUrl = await imagekit.upload({
          file: idCard.buffer, //required
          fileName: `${idCard.originalname}`, //required
          extensions: [
            {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95,
            },
          ],
        });
        let photo = selfieUrl.url;
        let idCardImg = idCardUrl.url;
        console.log(name, email, password, phoneNumber, photo, idCardImg);
        await User.create({
          name,
          email: lcEmail,
          password,
          phoneNumber,
          address,
          photo,
          idCardImg,
          status: "unverified",
          rating: 5,
        });
        const message = `User ${name} has succesfully registered`;
        res.status(201).json({ message });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error" });
      }
    });
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log("MASUK LOGIN!!");
      console.log(req.body, "?????????????");

      if (!email || email === undefined) throw { name: "empty_email" };
      if (!password || password === undefined) throw { name: "empty_password" };

      const lcEmail = email.toLowerCase();

      const selectedUser = await User.findOne({
        where: { email: lcEmail },
      });

      if (!selectedUser) {
        throw { name: "unauthorized" };
      }
      // console.log(selectedUser, "><><><><><");
      if (!Hash.verify(password, selectedUser.password)) {
        throw { name: "unauthorized" };
      }

      const token = generateToken({ id: selectedUser.id });
      res.status(200).json({
        access_token: token,
        name: selectedUser.name,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        photo: selectedUser.photo,
        rating: selectedUser.rating,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      let users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      let user = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
        include: Vehicle,
      });
      // console.log(user);
      if (!user) {
        throw { name: "not_found" };
      }
      user.money= priceFormatter(user.money)
      res.status(200).json(user);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getCurrentUser(req, res, next) {
    const userId = req.user.id;
    try {
      let currentUser = await User.findByPk(userId, {
        attributes: {
          exclude: ["password"],
        },
        include: Vehicle,
      });
      // console.log(user);
      currentUser.money= priceFormatter(currentUser.money)
      res.status(200).json(currentUser);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async changeUserStatus(req, res, next) {
    const { userId } = req.params;
    const newStatus = req.body.status;
    try {
      let userToUpdate = await User.findByPk(userId);
      if (!userToUpdate) {
        throw { name: "not_found" };
      }
      if (userToUpdate.status === newStatus) {
        throw { name: "no_change" };
      }

      await User.update(
        { status: newStatus },
        {
          where: { id: userId },
        }
      );

      const message = `Status of user with id ${userToUpdate.id} has been changed to ${newStatus}`;
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async rateUser(req, res, next) {
    try {
      const id = Number(req.params.id);
      const rating = Number(req.body.rating);
      const userId = req.user.id;

      // console.log(id, userId, rating);

      let userToRate = await User.findByPk(id);
      if (!userToRate) {
        throw { name: "not_found" };
      }

      if (id == userId) {
        throw { name: "self_rate" };
      }

      if (rating < 1) {
        throw { name: "invalid_rating" };
      } else if (rating > 5) {
        throw { name: "invalid_rating" };
      }

      let newRating = (userToRate.rating + rating) / 2;

      await User.update(
        { rating: newRating },
        {
          where: { id },
        }
      );

      const message = `Rated ${userToRate.name} with ${rating} successfully`;
      res.status(200).json({ message });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
