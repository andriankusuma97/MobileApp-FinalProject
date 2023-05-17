"use strict";

const Hash = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const db = require("../db/user.json");
    // console.log(db, "<><><>");
    const users = db.map((el) => {
      el.password = Hash.create(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(users);
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null);
  },
};
