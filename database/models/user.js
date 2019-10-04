const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email Already In Use!'
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = User;