const User = require('./user');
const TorrentSite = require('./torrentSite');
const TorrentInfo = require('./torrentInfo');
const TorrentListing = require('./torrentListing');
const TorrentSnapshot = require('./torrentSnapshot');
const TorrentGroup = require('./torrentGroup');

TorrentListing.hasMany(TorrentInfo);
TorrentListing.hasMany(TorrentSnapshot);
TorrentSnapshot.belongsTo(TorrentListing);
TorrentSnapshot.belongsTo(TorrentSite);
TorrentSnapshot.belongsTo(TorrentGroup);
TorrentGroup.belongsTo(TorrentSite);
TorrentInfo.belongsTo(TorrentListing);
TorrentInfo.hasOne(TorrentGroup);

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
};
