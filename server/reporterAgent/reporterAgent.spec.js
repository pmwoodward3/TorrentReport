const chai = require('chai');

const expect = chai.expect;
const assert = chai.assert;

chai.should();

const { TorrentStats } = require('../db/models');
const db = require('../db/db'); // db for force sync
const reporterAgent = require('./index');
const { initStat, closeStat } = require('./utils/stats'); // part of test

describe('reportAgent', () => {
  describe('properties', () => {
    before(() => db.sync({ force: true }));
    it('should be a promise chain', () => {
      const result = reporterAgent();
      return expect(result).to.be.a('promise');
    });
  });
  describe('if a scrape is currently active', () => {
    before(() => db.sync({ force: true }));
    it('should fail', () => {
      initStat()
        .then(_ => reporterAgent())
        .then(res => expect(res).to.be.a('undefined'), err => expect(err).to.be.a('error'));
    });
  });
});
