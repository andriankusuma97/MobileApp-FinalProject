const Hash = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Admin } = require("../models");

class AdminController {
  static async adminRegister(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const lcEmail = email.toLowerCase();
      let newAdmin = await Admin.create({
        name,
        email: lcEmail,
        password,
      });

      const message = `Admin ${newAdmin.name} has succesfully registered`;
      res.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || email === undefined) throw { name: "empty_email" };
      if (!password || password === undefined) throw { name: "empty_password" };

      const lcEmail = email.toLowerCase();

      const currentAdmin = await Admin.findOne({ where: { email: lcEmail } });
      if (!currentAdmin) {
        throw { name: "unauthorized" };
      }

      if (!Hash.verify(password, currentAdmin.password)) {
        throw { name: "unauthorized" };
      }

      const token = generateToken({ id: currentAdmin.id });
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
