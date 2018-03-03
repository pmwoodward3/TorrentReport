const chai = require('chai');
// const chaiProperties = require('chai-properties');
// const chaiThings = require('chai-things');
// chai.use(chaiProperties);
// chai.use(chaiThings);
const expect = chai.expect;

const { TorrentStats } = require('../../db/models');
const db = require('../../db/db'); // db for forcesync
const safeToRunAgent = require('./safeToRunAgent'); // part of test
const { initStat } = require('./stats'); // part of test

describe('reporterAgent Utilities', () => {
  describe('initStat()', () => {});
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
