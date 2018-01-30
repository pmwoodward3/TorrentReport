const User = require('./user');
const TorrentSite = require('./torrentSite');
const TorrentInfo = require('./torrentInfo');
const TorrentListing = require('./torrentListing');
const TorrentSnapshot = require('./torrentSnapshot');
const TorrentGroup = require('./torrentGroup');

// TorrentListing.hasMany(TorrentInfo);
// TorrentListing.hasMany(TorrentSnapshot);
// TorrentSnapshot.belongsTo(TorrentListing);
// TorrentSnapshot.belongsTo(TorrentSite);
// TorrentSnapshot.belongsTo(TorrentGroup);
// TorrentGroup.belongsTo(TorrentSite);
// TorrentInfo.belongsTo(TorrentListing);
// TorrentInfo.hasOne(TorrentGroup);

module.exports = {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
};
