"use strict";
const Hash = require("../helpers/bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserRide, {
        foreignKey: "UserId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      User.hasOne(models.Vehicle, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is already used, please use another email",
        },
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          // len: {
          //   args: [5],
          //   msg: "Password minimum 5 characters",
          // },
          minChars(value) {
            if (value.length < 5) {
              throw new Error("Password minimum 5 characters");
            }
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone number is required" },
          notNull: { msg: "Phone number is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Address is required" },
          notNull: { msg: "Address is required" },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Photo is required" },
          notNull: { msg: "Photo is required" },
        },
      },
      idCardImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ID card photo is required" },
          notNull: { msg: "ID card photo is required" },
        },
      },
      rating: DataTypes.FLOAT,
      status: DataTypes.STRING,
      money: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = Hash.create(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
