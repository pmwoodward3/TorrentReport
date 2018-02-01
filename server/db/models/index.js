const User = require('./user');
const TorrentSite = require('./torrentSite');
const TorrentInfo = require('./torrentInfo');
const TorrentListing = require('./torrentListing');
const TorrentSnapshot = require('./torrentSnapshot');
const TorrentGroup = require('./torrentGroup');

TorrentGroup.belongsTo(TorrentSite);
TorrentInfo.belongsTo(TorrentGroup);

TorrentListing.belongsToMany(TorrentInfo, { as: 'Infos', through: 'ListingInfo' });
TorrentInfo.belongsTo(TorrentListing);

TorrentSnapshot.belongsTo(TorrentInfo);

module.exports = {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
};
