'use strict';

const { Review } = require('../models');

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
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'I love the tea quality here! This is my go-to when craving boba :)',
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Very unique flavors!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'The boba is super yummy, but the brown sugar is just sweet milk TBH',
        stars: 2
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Honestly a little pricey, but worth every once in a while',
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Tons of choices, very delicious!',
        stars: 5
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
