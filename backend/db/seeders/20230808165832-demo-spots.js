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
        address: '140 S B St.',
        city: 'San Mateo',
        state: 'California',
        country: 'USA',
        lat: 12.7542,
        lng: -90.1934,
        name: 'Urban Ritual',
        description: 'Founded in the heart of San Francisco, Urban Ritual is an American brand that aims to bring unity to everyone through a common daily routine—coffee and tea.',
        price: 100,
      },
      {
        ownerId: 2,
        address: '1069 El Camino Real',
        city: 'Millbrae',
        state: 'California',
        country: 'USA',
        lat: 12.7594,
        lng: -90.1504,
        name: 'Wanpo Tea Shop',
        description: "A traditional tea beverage brand brewed out of Taiwan’s military dependents’ village.",
        price: 120,
      },
      {
        ownerId: 3,
        address: '429 Stockton St.',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.7587,
        lng: -90.8764,
        name: 'Boba Guys',
        description: 'A boba shop where the creators wanted to fundamentally change the way people view boba, tea, and perhaps, food.',
        price: 90,
      },
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
