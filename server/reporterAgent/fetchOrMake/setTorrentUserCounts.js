const { RALogger } = require('../../logging');
const { sendError } = require('../../notifier/email/emails');
const { TorrentInfo, TorrentUploader } = require('../../db/models');
const { sequentialPromise } = require('../utils/sequentialPromise');

const setTorrentUserCounts = () => {
  TorrentUploader.findAll().then((uploadersArr) => {
    // return sequentialPromise(uploadersArr)
  });
};

module.exports = setTorrentUserCounts;
