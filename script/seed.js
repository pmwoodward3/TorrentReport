/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const {
  User,
  TorrentSite,
  TorrentInfo,
  TorrentListing,
  TorrentSnapshot,
  TorrentGroup,
} = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'admin@email.com', isAdmin: true, password: '123' }),
    User.create({ email: 'user@email.com', password: '123' }),
  ]);

  const torrentSites = await Promise.all([
    TorrentSite.create({
      name: 'The Pirate Bay',
      short: 'TPB',
      url: 'https://thepiratebay.org/',
    }),
    TorrentSite.create({
      name: 'RARBG',
      short: 'RARBG',
      url: 'https://rarbg.to',
    }),
  ]);

  // const torrentInfo = await Promise.all([
  //   TorrentInfo.create({
  //     uploadDate: new Date(),
  //     uploadUser: 'upLOADERuser',
  //     size: '2.4 GB',
  //     hash: '111233321123',
  //     url: 'https://faek.site',
  //   }),
  // ]);

  console.log('-------- seeded successfully --------');
  console.log(` + ${users.length} users`);
  console.log(` + ${torrentSites.length} torrent sites`);
  // console.log(` + ${torrentInfo.length} torrent infos`);
  // console.log(` + ${torrentListing.length} torrent listings`);
  // console.log(` + ${torrentSnapshot.length} torrent snapshots`);
  // console.log(` + ${torrentGroup.length} torrent groups`);
  console.log('-------------------------------------');
}

seed()
  .catch((err) => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
