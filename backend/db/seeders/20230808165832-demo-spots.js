'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '7 Got St.',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.7542,
        lng: -90.1934,
        name: 'jackson',
        description: 'JW walked here before',
        price: 77,
      },
      {
        ownerId: 2,
        address: '77 Got St.',
        city: 'San Diego',
        state: 'California',
        country: 'USA',
        lat: 12.7594,
        lng: -90.1504,
        name: 'randy',
        description: 'RT walked here before',
        price: 143,
      },
      {
        ownerId: 3,
        address: '777 Got St.',
        city: 'South San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.7587,
        lng: -90.8764,
        name: 'camille',
        description: 'CH walked here before',
        price: 10,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
