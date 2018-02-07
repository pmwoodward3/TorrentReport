const User = require('./user');
const TorrentSite = require('./torrentSite');
const TorrentInfo = require('./torrentInfo');
const TorrentListing = require('./torrentListing');
const TorrentSnapshot = require('./torrentSnapshot');
const TorrentGroup = require('./torrentGroup');
const TorrentStats = require('./torrentStats');

TorrentGroup.belongsTo(TorrentSite);
TorrentInfo.belongsToMany(TorrentGroup, { as: 'Group', through: 'InfoGroup' });

TorrentListing.belongsToMany(TorrentInfo, { as: 'Infos', through: 'ListingInfo' });
TorrentInfo.belongsTo(TorrentListing);

TorrentSnapshot.belongsTo(TorrentInfo);
TorrentSnapshot.belongsTo(TorrentStats);

module.exports = {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
  TorrentStats,
};
