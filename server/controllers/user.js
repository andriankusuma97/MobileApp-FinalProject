const Hash = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Vehicle } = require("../models");
const ImageKit = require("imagekit");
const uuid = require("uuid");

class UserController {
  static async register(req, res, next) {
    try {
      // const { name, email, password, phoneNumber, photo, idCardImg } = req.body;
      // console.log(password);
      // const newPass = Hash.create(password);
      // const status = "unverified";
      // await User.create({
      //   name,
      //   email,
      //   password,
      //   phoneNumber,
      //   photo,
      //   idCardImg,
      //   status,
      //   rating: 5,
      // });

      var imagekit = new ImageKit({
        publicKey: "public_598ryvTcQKwiS8vjsgNTeEUsvfY=",
        privateKey: "private_8dPPtCNhJ11zMc2K2U/dQBJ6E5g=",
        urlEndpoint: "https://ik.imagekit.io/pckjztu2z",
      });
      // console.log(req.files, "<<<<<<<<<");
      imagekit
        .upload({
          file: req.files[0].buffer, //required
          fileName: `${uuid}+${req.files[0].originalname}`, //required
          extensions: [
            {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95,
            },
          ],
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(req.files);
      const message = `User ${4} has succesfully registered`;
      res.status(201).json({ message });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log("MASUK LOGIN!!");
      // console.log(req.body, "?????????????");

      if (!email || email === undefined) throw { name: "empty_email" };
      if (!password || password === undefined) throw { name: "empty_password" };

      const selectedUser = await User.findOne({
        where: { email },
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
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
