const chai = require('chai');
// const chaiProperties = require('chai-properties');
// const chaiThings = require('chai-things');
// chai.use(chaiProperties);
// chai.use(chaiThings);
const expect = chai.expect;

const { TorrentStats } = require('../../db/models');
const db = require('../../db/db'); // db for forcesync
const safeToRunAgent = require('./safeToRunAgent'); // part of test
const { initStat, closeStat } = require('./stats'); // part of test

describe('reporterAgent Utilities', () => {
  describe('initStat()', () => {
    beforeEach(() => db.sync({ force: true }));
    describe('when called', () =>
      it('should create an active torrentStat listings', () =>
        initStat()
          .then(_ => TorrentStats.findAll({ where: { active: true } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(1);
          })));
  });
  describe('closeStat()', () => {
    beforeEach(() => db.sync({ force: true }));
    describe('when called', () => {
      it('should close active torrentStat listing ', () =>
        initStat()
          .then(_ => closeStat({}))
          .then(_ => TorrentStats.findAll({ where: { active: true } }))
          .then((activeStats) => {
            expect(Array.from(activeStats).length).to.equal(0);
          }));
      it('should update closed listing info with passed object ', () =>
        initStat()
          .then(_ => closeStat({ siteCount: 21, scrapeCount: 21, infoCount: 21 }))
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
      let statObj;
      before(() => {
        initStat();
      });
      it('should return false if scrape is ongoing', () => {
        safeToRunAgent().then((isReady) => {
          expect(isReady).to.equal(false);
        });
        // assert.equal(-1, [1, 2, 3].indexOf(4));
      });
    });
  });
});
