"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "reviewpic.com",
      },
      {
        reviewId: 2,
        url: "reviewpic.com",
      },
      {
        reviewId: 3,
        url: "reviewpic.com",
      },
      {
        reviewId: 4,
        url: "reviewpic.com",
      },
      {
        reviewId: 5,
        url: "reviewpic.com",
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  },
};
