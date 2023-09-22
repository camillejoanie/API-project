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
          url: "https://i.postimg.cc/Hrbvv3tm/URBAN.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.postimg.cc/Y4kn5gXW/urbanritual1.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.postimg.cc/CZNPS1t6/urbanritual2.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.postimg.cc/tZ4rTbGR/urbanritual3.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.postimg.cc/0zgPJWQ1/urbanritualstore.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.postimg.cc/D4ZvVQSG/YIFANG.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.postimg.cc/gxB0GTV0/YIFANG2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.postimg.cc/QVxxWDfM/YIFANG3.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.postimg.cc/sM2XdrZ8/YIFANG-interior.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://i.postimg.cc/G8zLSgmr/YIFANG-exterior.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.postimg.cc/R6zrQ71m/purplekow.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.postimg.cc/p9jbFGFk/purplekow2.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.postimg.cc/tZdKrsDx/purplekow3.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.postimg.cc/p52g3P11/purplekow4.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://i.postimg.cc/mPtGb2Zv/purplekow-exterior.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.postimg.cc/dZkchrc0/wanpo1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.postimg.cc/R34mgWKP/wanpo2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.postimg.cc/G4krPF88/wanpo3.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.postimg.cc/YjZwJnQL/wanpointerior.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://i.postimg.cc/G8S13zNN/wanpostore.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.postimg.cc/0zq1NzW8/happylemon1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.postimg.cc/ZWFtvJ26/happylemon2.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.postimg.cc/WhZPjG7W/happylemon3.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.postimg.cc/Q9zRZCKZ/happylemoninterior.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://i.postimg.cc/s1ttnBRp/happylemonstore.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.postimg.cc/67jPCq04/bobaguys2.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://i.postimg.cc/nX1gc09k/3-1.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.postimg.cc/mtCKKbbK/bobaguys3.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.postimg.cc/rDT7kvss/bobaguysinterior.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://i.postimg.cc/SXN5XCWp/bobaguysstore.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.postimg.cc/5jVYjDC7/tpumps.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://i.postimg.cc/svfM4SK5/tpumps2.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.postimg.cc/LnynCX0w/tpumps3.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.postimg.cc/z3FLhpwJ/tpumps4.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://i.postimg.cc/n9pJZ4M2/tpumps-exterior.jpg",
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
