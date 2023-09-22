'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 5,
        startDate: '2023-09-11',
        endDate: '2023-10-06'
      },
      {
        spotId: 2,
        userId: 4,
        startDate: '2022-12-31',
        endDate: '2023-01-03'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-07-27',
        endDate: '2023-08-02'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2023-04-11',
        endDate: '2023-04-14'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2022-06-30',
        endDate: '2022-07-11'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
