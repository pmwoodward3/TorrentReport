const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const generateToken = require('../../auth/token');

const UserAccess = db.define('UserAccess', {
  token: {
    type: Sequelize.STRING,
  },
  action: {
    type: Sequelize.ENUM,
    values: ['reset_password', 'activate_account'],
    allowNull: false,
  },
});

const createToken = (UserAccess) => {
  UserAccess.token = generateToken();
};

UserAccess.beforeCreate(createToken);

module.exports = UserAccess;
