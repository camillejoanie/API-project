'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'jackson',
        lastName: 'wang',
        email: 'demo@jackson.io',
        username: 'jackson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'camille',
        lastName: 'huang',
        email: 'camille@user.io',
        username: 'camille',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'randy',
        lastName: 'demo',
        email: 'randy@user.io',
        username: 'randy',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'gumbo',
        lastName: 'fav',
        email: 'gumbo@user.io',
        username: 'gumbo',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'mondu',
        lastName: 'woof',
        email: 'mondu@user.io',
        username: 'mondu',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@demo.com',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('Demodemo')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
