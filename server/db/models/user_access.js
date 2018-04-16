const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const base64url = require('base64url');

const UserAccess = db.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  action: {
    type: Sequelize.ENUM,
    values: ['reset_password', 'activate_account'],
    allowNull: false,
  },
});

module.exports = UserAccess;

/**
 * instanceMethods
 */
UserAccess.prototype.correctPassword = function (candidatePwd) {
  return UserAccess.encryptPassword(candidatePwd, this.salt) === this.password;
};

/**
 * classMethods
 */
UserAccess.generateToken = function () {
  return base64url(crypto.randomBytes(21));
};

/**
 * hooks
 */
const setSaltAndPassword = (accessObj) => {
  accessObj.token = UserAccess.generateToken();
};

UserAccess.beforeCreate(setSaltAndPassword);
