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
const db = require('../server/db')
const { User, TorrentSite } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'admin@email.com', isAdmin: true, password: '123' }),
    User.create({ email: 'user@email.com', password: '123' })
  ])

  const torrentSites = await Promise.all([
    TorrentSite.create({
      name: 'The Pirate Bay',
      short: 'TPB',
      url: 'https://thepiratebay.org/'
    }),
    TorrentSite.create({
      name: 'RARBG',
      short: 'RARBG',
      url: 'https://rarbg.to'
    })
    // TorrentSite.create({
    //   name: '1337X',
    //   short: '1337X',
    //   url: 'http://1337x.to/'
    // }),
    // TorrentSite.create({
    //   name: 'ExtraTorrent',
    //   short: 'ET',
    //   url: 'https://extratorrent.cd/'
    // }),
    // TorrentSite.create({
    //   name: 'LimeTorrents',
    //   short: 'LT',
    //   url: 'https://www.limetorrents.cc/'
    // }),
    // TorrentSite.create({
    //   name: 'TorrentDownloads',
    //   short: 'TD',
    //   url: 'https://www.torrentdownloads.me/'
    // }),
    // TorrentSite.create({
    //   name: 'IsoHunt',
    //   short: 'IH',
    //   url: 'https://isohunts.to/'
    // }),
    // TorrentSite.create({
    //   name: 'Torrentz2',
    //   short: 'Tz2',
    //   url: 'https://torrentz2.eu/'
    // }),
    // TorrentSite.create({
    //   name: 'YTS/YIFY',
    //   short: 'YTS',
    //   url: 'https://yts.ag/'
    // }),
    // TorrentSite.create({
    //   name: 'KickAssTorrents',
    //   short: 'KAT',
    //   url: 'https://katcr.co/'
    // }),
    // TorrentSite.create({
    //   name: 'TorrentFunk',
    //   short: 'TF',
    //   url: 'https://www.torrentfunk.com/'
    // }),
    // TorrentSite.create({
    //   name: 'Torlock',
    //   short: 'TLock',
    //   url: 'https://www.torlock.com/'
    // }),
    // TorrentSite.create({
    //   name: 'EZTV',
    //   short: 'EZTV',
    //   url: 'https://eztv.ag/'
    // }),
    // TorrentSite.create({
    //   name: 'Sky Torrents',
    //   short: 'SkyT',
    //   url: 'https://www.skytorrents.in/'
    // }),
    // TorrentSite.create({
    //   name: 'Demonoid',
    //   short: 'DEMON',
    //   url: 'https://www.demonoid.pw/'
    // }),
    // TorrentSite.create({
    //   name: 'BTScene',
    //   short: 'BTS',
    //   url: 'https://bt-scene.cc/'
    // }),
    // TorrentSite.create({
    //   name: 'Torrents.me',
    //   short: 'T.ME',
    //   url: 'https://torrents.me/'
    // }),
    // TorrentSite.create({
    //   name: 'iDope',
    //   short: 'iDope',
    //   url: 'https://idope.se/'
    // }),
    // TorrentSite.create({
    //   name: 'YourBittorrent',
    //   short: 'YB',
    //   url: 'https://yourbittorrent.com/'
    // }),
    // TorrentSite.create({
    //   name: 'Monova',
    //   short: 'MONO',
    //   url: 'https://monova.org/'
    // }),
    // TorrentSite.create({
    //   name: 'Seedpeer',
    //   short: 'SP',
    //   url: 'https://www.seedpeer.eu/'
    // })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${torrentSites.length} torrent sites`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
