const { RALogger } = require('../../logging');
const { sendError } = require('../../notifier/email/emails');
const { TorrentInfo, TorrentUploader } = require('../../db/models');

const addOrSetUser = (listingObj) => {
  const lowerCaseName = listingObj.uploadUser.toLowerCase();
  TorrentUploader.findOrCreate({
    where: { lowerCaseName },
  })
    .spread(async (uploaderObj, created) => {
      if (created) {
        uploaderObj
          .update({ name: listingObj.uploadUser })
          .catch(err => RALogger.error('failed to set created uploader name'));
      }
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
};

module.exports = addOrSetUser;
