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
      url: "https://s3-media0.fl.yelpcdn.com/bphoto/IVV806FwEQJldPpI4BD99w/348s.jpg",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://i.postimg.cc/vgsD7pwP/urbanritual2.jpg",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://i.postimg.cc/ppTrBf3t/urbanritual3.jpg",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://i.postimg.cc/GB0prZtc/urbanritualmenu.jpg",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://i.postimg.cc/CZjxKmnb/urbanritualstore.jpg",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://i.postimg.cc/G9bH4wQt/wanpo1.jpg",
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.postimg.cc/CBTnPRks/3-1.jpg',
      preview: true,
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
