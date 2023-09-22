'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
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
   await Spot.bulkCreate(
     [
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
        price: 190,
      },
      {
        ownerId: 1,
        address: '4923 Junipero Serra Blvd.',
        city: 'Colma',
        state: 'California',
        country: 'USA',
        lat: 12.7530,
        lng: -90.1940,
        name: 'YiFang',
        description: 'Not your typical bubble tea shop. Experience the old-fashioned Taiwanese premium tea made with love & real ingredients.',
        price: 250,
      },
      {
        ownerId: 1,
        address: '3620 Balboa St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.7587,
        lng: -90.8764,
        name: 'Purple Kow',
        description: "We intend for our products to leave a lasting taste that you'll always think back to and occasionally crave. Years down the line, maybe you’ll be reminded of the taste of your favorite drink from Purple Kow and you’ll get a sudden craving for it.",
        price: 210,
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
        price: 300,
      },
      {
        ownerId: 2,
        address: '1419 Burlingame Ave ste a',
        city: 'Burlingame',
        state: 'California',
        country: 'USA',
        lat: 12.7777,
        lng: -90.1111,
        name: 'Happy Lemon',
        description: 'A world-leading beverage chain founded in 2006 by the Yummy-Town Group, a publicly listed tea culture company originating in Taiwan.',
        price: 150,
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
        price: 140,
      },
      {
        ownerId: 4,
        address: '1916 Irving St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 12.7550,
        lng: -90.1555,
        name: 'Tpumps',
        description: "At Tpumps, we use loose leaf teas to brew all of our high quality teas. We brew our tea fresh daily - controlling the time and temperature to ensure the freshest, best quality tea experience for our Tpumps fans.",
        price: 90,
      },
     ],
     { validate: true }
   );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
