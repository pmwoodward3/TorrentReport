const User = require('./user')
const TorrentSite = require('./torrentSite')
const TorrentListing = require('./torrentListing')
const TorrentSnapshot = require('./torrentSnapshot')
const TorrentGroup = require('./torrentGroup')

TorrentListing.belongsToMany(TorrentSite, { through: 'SiteListing' })
TorrentSite.belongsToMany(TorrentListing, { through: 'SiteListing' })

TorrentSnapshot.belongsTo(TorrentSite)
TorrentSnapshot.belongsTo(TorrentListing)
TorrentSnapshot.belongsToMany(TorrentGroup, { through: 'SnapshotGroup' })
TorrentGroup.belongsToMany(TorrentSnapshot, { through: 'SnapshotGroup' })

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
  TorrentSite
}
