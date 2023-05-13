'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User)
      Vehicle.hasOne(models.Ride, {
        foreignKey: "VehicleId"
      })
    }
  }
  Vehicle.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Vehicle type is required" },
        notNull: { msg: "Vehicle type is required" },
      },
    },
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Vehicle plate number is required" },
        notNull: { msg: "Vehicle plate number is required" },
      },
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};