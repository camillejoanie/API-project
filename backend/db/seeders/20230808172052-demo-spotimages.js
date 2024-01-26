"use strict";

const { SpotImage } = require("../models");

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
        {
          spotId: 8,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Wj8S6crFXWm8JbMIQVVgFA/o.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Z9UUa7jvkxNrF6mRVOCe1w/o.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/mx1OsDoD4wvjv9Gg7L7kNA/o.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/p-gv-5ek_XBI_kGhfihRdg/o.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/F7hEICVZqfPIHV5l0yEdjA/o.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/MUKXQ9EhCJ4XOrSMNA0cMQ/o.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/78yFi21-3XneCdBJNupenw/o.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/AYIwB5gbp7e7t4UcMPMWDQ/o.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/AkGfFyNwJM4gQBfZjja-5g/o.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/X_yCrjZXxrF-n_5azhM1og/o.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/p8K1PcXZFAUvQXCd3UdS0w/o.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/OP_he_ROvzQ0QEOaBnexsg/o.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/g3yEPnnru-mmuB9-ssHz0g/o.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/WzmdGA77kRMxnlE4K4lZ9g/o.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/B2XVGpQuVUUhBlScmZQV9Q/o.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/EObc-wMmx-_3USU43nGI1g/o.jpg",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/5096vqsQRmHcTAGyJM2X8A/o.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/2XH5v2yH1YTp8Ca0FCz7Gg/o.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/23EHCa77VPAtczybUJBgZQ/o.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/lKtriNbdbcuelYZG6yJllw/o.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/MOHL965NBJk4XMyE6x545g/o.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/1JCQfIWuIxdN5tuz31H1oA/o.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Wbk5LzE03kEtxBZEoydyGQ/o.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/kiYEQKYK19v52LOX3FA46A/o.jpg",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/jQ1tfLzXMgWgSlwzesW2bg/o.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/aF1zlfuj2rmRzrNwfQutgA/o.jpg",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Z69d00HMjssQxPpagTuKqg/o.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/R9Ldec8IqbfzsrxyYjDxRw/o.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/oBBAQk9S8LgI4jmVDBHQjA/o.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/tHDldfQnZZUQEdLE_5DgCw/o.jpg",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/nZqNqc5CBBTUIlAwTRTolg/o.jpg",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/31rhyjdBObSwEybFO2sjeg/o.jpg",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/tCxktHeO3luSXpepJlhF2g/o.jpg",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/KfxCOHlOYnGpv1FFImzcYA/o.jpg",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/z-vhnqt3ofF38uXHQy4Y1Q/o.jpg",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/Tx_lFmZ5NMc9clAdCmRDMw/o.jpg",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/HWnNkd5j145ITuyduBiZNA/o.jpg",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/CEXr2314a0fQ322JWv8A5Q/o.jpg",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/6Yf4D_T93LyjiAkzGw1yjg/o.jpg",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/VV5cJm4wTMx9T6U2wff49w/o.jpg",
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  },
};
