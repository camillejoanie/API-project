'use strict';

const { SpotImage } = require('../models');

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
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: "/images/1_1.png",
      preview: true,
    },
    {
      spotId: 1,
      url: "/images/1_2.png",
      preview: true,
    },
    {
      spotId: 1,
      url: "/images/1_3.webp",
      preview: true,
    },
    {
      spotId: 1,
      url: "/images/1_4.jpeg",
      preview: true,
    },
    {
      spotId: 1,
      url: "/images/1_5.jpeg",
      preview: true,
    },
    {
      spotId: 2,
      url: "/images/2_1.jpeg",
      preview: false,
    },
    {
      spotId: 2,
      url: '/images/2_2.jpeg',
      preview: false,
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
