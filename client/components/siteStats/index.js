import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './style.scss';
import { fetchStats } from '../../store';
import StatSquare from './statSquare';
/**
 * COMPONENT
 */
const SiteStats = (props) => {
  const stats = props.stats.siteStats.scrapeCount ? props.stats.siteStats : props.fetchAllStats();

  const nowDateObj = new Date(stats.fetched);
  let duration;
  let lastScrapeTime;
  if (stats.endedAt && stats.createdAt) {
    const endedDateObj = moment(stats.endedAt);
    const createdDateObj = moment(stats.createdAt);
    duration = endedDateObj.diff(createdDateObj, 'minutes', true); // 1;
    duration = duration.toFixed(2);
    lastScrapeTime = moment(stats.endedAt).fromNow();
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <div className="stats">
      <div className="seperator">
        <div className="descr">
          <div className="top">TORRENT REPORT</div>
          <div className="head">STATISTICS</div>
          <div className="date">as of {nowDateObj.toLocaleTimeString('en-us', options)}</div>
        </div>
        <div className="group2">
          <StatSquare name="Scrape Runs" value={stats.scrapeCount} />
          <StatSquare name="Sites" value={stats.siteCount} />
        </div>
        <div className="group2">
          <StatSquare name="Sites Load Count" value={stats.siteLoadCount} />
          <StatSquare name="Torrent Load Count" value={stats.torrentLoadCount} />
        </div>
      </div>
      <div className="seperator">
        <div className="group2">
          <StatSquare name="Group Count" value={stats.groupCount} />
          <StatSquare name="Info Count" value={stats.infoCount} />
        </div>
        <div className="group2">
          <StatSquare name="Snapshot Count" value={stats.snapshotCount} />
          <StatSquare name="Torrent Count" value={stats.torrentCount} />
        </div>
        <div className="group2">
          <StatSquare name="Minute Scrape Time" value={duration} />
          <StatSquare name="Last Scrape Run" value={lastScrapeTime} />
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  stats: state.stats,
});

const mapDispatch = dispatch => ({
  fetchAllStats: () => {
    dispatch(fetchStats());
    return false;
  },
});

export default connect(mapState, mapDispatch)(SiteStats);
