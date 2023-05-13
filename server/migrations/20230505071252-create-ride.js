"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startLocation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      departureTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      arrivalTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seats: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      VehicleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Vehicles",
            key: "id",
          },
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rides");
  },
};
