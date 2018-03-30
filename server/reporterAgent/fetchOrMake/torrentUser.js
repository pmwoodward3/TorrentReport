const { RALogger } = require('../../logging');
const { sendError } = require('../../notifier/email/emails');
const { TorrentInfo, TorrentUploader } = require('../../db/models');

const addOrSetUser = listingObj =>
  TorrentUploader.findOrCreate({
    where: { name: listingObj.uploadUser },
  })
    .spread(async (uploaderObj, created) => {
      RALogger.verbose(`torrentUploader Name: ${uploaderObj.name} - Id: ${
        uploaderObj.id
      } - uploaderObj AddSiteUploader: ${listingObj.torrentSiteId}`);
      await TorrentInfo.findById(listingObj.torrentInfoId).then(infoObj =>
        infoObj.update({ torrentUploaderId: uploaderObj.id }));

      return uploaderObj.addTorrentSite(listingObj.torrentSiteId);
    })
    .catch((err) => {
      RALogger.error('ERROR IN addOrSetUser');
      RALogger.error(err);
      sendError(`error in add or set user ${addOrSetUser}`);
    });

module.exports = addOrSetUser;
