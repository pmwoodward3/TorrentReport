const chai = require('chai');

const { expect } = chai;

chai.should();

// const { TorrentStats } = require('../db/models');
const reporterAgent = require('./index');
const { initStat } = require('./fetchOrMake/stats'); // part of test
const { siteData } = require('./testData');

describe('reportAgent', () => {
  describe('properties', () => {
    it('should be a promise chain', () => {
      const result = reporterAgent(siteData).catch(_ => Promise.resolve());
      return expect(result).to.be.a('promise');
    });
  });
  describe('if a scrape is currently active', () => {
    it('should fail', () => {
      initStat()
        .then(_ => reporterAgent(siteData))
        .then(res => expect(res).to.be.a('undefined'), err => expect(err).to.be.a('error'));
    });
  });
});
