const crypto = require('crypto');

const generateToken = (nonceLen = 32) =>
  crypto
    .randomBytes(Math.ceil(nonceLen * 3 / 4))
    .toString('base64') // convert to base64 format
    .slice(0, nonceLen) // return required number of characters
    .replace(/\+/g, '0') // replace '+' with '0'
    .replace(/\//g, '0'); // replace '/' with '0'

module.exports = generateToken;
