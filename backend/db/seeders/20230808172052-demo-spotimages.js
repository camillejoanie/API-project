'use strict';


const { SpotImage } = require('../models');

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
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/5hknWDDyPMJVLEcs-J47Bg/o.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://media.tenor.com/8V2NzA_CLTgAAAAM/aesthetic-panda-drinking-boba-tea-panda.gif",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/LEYtEaOvKoTdoTpbp-9KZQ/o.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Kq4JxLHaW1VAg3GUoC0kxA/o.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/crwIfEeq5zRwjtsilr_PLA/o.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/o4tZ6kv1yXjCO_v0fcq7wA/o.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/EdspkRJ99vETSa1UZS3onw/o.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/blaOeQQshlp5LOidE9MZFQ/o.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDVzdzdkZXRlcjB3bW9tdnljdG0yYmpqejRxMHAycjFma2U3b2thOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKyaYJ7IbcHh9kGNEE/giphy.gif",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/_Hosc-67J-zGNawU5MDIXA/o.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/2i4CPCyLflwaIVLmPtH3rg/o.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/hoD8GSDM96lkwv2ohPmmpg/o.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDBseDF3cnc2djV6MmhheTlvNzltajd6aTQ3eHhtMTBydmJlYWMzeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TOfjSaCsttYzA6nrpV/giphy.gif",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/gunkZ9PEP1Fqbid6DJnAsw/o.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/8NFBrI1_G_Lbo0n1aXjNkw/o.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/dTbhuMXTW7UkVCmUVHWqZA/o.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://www.icegif.com/wp-content/uploads/2023/04/icegif-232.gif",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/oBw2kVmIg2SZbtZp2gM4LA/o.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/QAmhE08QNLr4q9t5munM5w/o.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/bW4p3Gn2O-IYeEkjyUfedw/o.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/bMUofJoifTHfgooNj_CbxA/o.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/waRhvrre27s-O-UdammTyQ/o.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/_DLNtB0SDuvBgjwNbIKuTA/o.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://media.tenor.com/_RzpIUqvsXAAAAAC/boba.gif",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/mXyeolxjQxtQKYQdugNsPQ/o.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/A3k1KHzIqKPIusqXIedOlw/o.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://i.pinimg.com/originals/22/49/4f/22494fbcdc4e4ef62dd0aa1d80d8a90a.gif",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/l8YW1MTcn65A1Wbpwx9FuA/o.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/KJpnWq9Wqco2Nr5uZARNdQ/o.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/oPyHw16JgHbeLjwTzWGghA/o.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/PVJJffZRpy6x2nzsDZBjIw/o.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Un5mygBLhEa4Zysp4AIonA/o.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.pinimg.com/originals/56/4f/64/564f642919d3b7e26845d1b0f8260e61.gif",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/S67U6acCyyeefY34oSDhew/o.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/xbsKqbc5a6gSZ-qon97BNw/o.jpg",
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
