const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharearide.indo@gmail.com",
    pass: "nsahqjnazrvjrjda",
  },
});

module.exports = mailTransporter;