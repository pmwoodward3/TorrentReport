/* const chai = require('chai');
// const chaiProperties = require('chai-properties');
// const chaiThings = require('chai-things');
// chai.use(chaiProperties);
// chai.use(chaiThings);
const { expect } = chai;

const { TorrentStats } = require('../../db/models');
const db = require('../../db/db'); // db for forcesync
const safeToRunAgent = require('./safeToRunAgent'); // part of test
const { initStat, closeStat, setCloseStat } = require('../fetchOrMake/stats'); // part of test

const { siteData } = require('../testData');

describe('reporterAgent Utilities', () => {
  // beforeEach(() => db.sync({ force: true }));

  describe('initStat()', () => {
    describe('when called', () =>
      it('should create an active torrentStat listings', () =>
        initStat()
          .then(_ => TorrentStats.findAll({ where: { active: true } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(1);
          })));
  });

  describe('closeStat()', () => {
    describe('when called', () => {
      it('should close active torrentStat listing ', () =>
        initStat()
          .then(_ => closeStat(siteData))
          .then(_ => TorrentStats.findAll({ where: { active: true } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(0);
          }));

      it('should update closed listing info with passed object ', () =>
        initStat()
          .then(_ => setCloseStat({ siteCount: 21, scrapeCount: 21, infoCount: 21 }))
          .then(_ =>
            TorrentStats.findAll({ where: { siteCount: 21, scrapeCount: 21, infoCount: 21 } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(1);
          }));
    });
  });

  describe('safeToRunAgent()', () => {
    describe('when scrape is still active', () => {
      it('should throw error if scrape is ongoing', () => {
        initStat()
          .then(_ => expect(safeToRunAgent).to.throw('not safe to run agent'))
          .catch(_ => Promise.resolve());
        // .then(closeStat(siteData));
      });
    });
  });
});
 */
