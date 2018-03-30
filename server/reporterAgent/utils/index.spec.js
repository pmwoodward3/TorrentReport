const chai = require('chai');
// const chaiProperties = require('chai-properties');
// const chaiThings = require('chai-things');
// chai.use(chaiProperties);
// chai.use(chaiThings);
const expect = chai.expect;

const { TorrentStats } = require('../../db/models');
const db = require('../../db/db'); // db for forcesync
const safeToRunAgent = require('./safeToRunAgent'); // part of test
const { initStat, closeStat, setCloseStat } = require('../fetchOrMake/stats'); // part of test

const { siteData } = require('../testData');

describe('reporterAgent Utilities', () => {
  describe('initStat()', () => {
    beforeEach(() => db.sync({ force: true }));
    describe('when called', () =>
      it('should create an active torrentStat listings', () =>
        initStat()
          .then(_ => TorrentStats.findAll({ where: { active: true } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(1);
          })
          .then(closeStat(siteData))));
  });

  describe('closeStat()', () => {
    before(() => db.sync({ force: true }));
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
    beforeEach(() => db.sync({ force: true }));
    describe('when scrape is still active', () => {
      it('should return error if scrape is ongoing', () => {
        initStat()
          .then(_ => safeToRunAgent())
          .then((isReady) => {
            expect(isReady).to.equal(false);
          })
          .then(closeStat(siteData));
      });
    });
  });
});
