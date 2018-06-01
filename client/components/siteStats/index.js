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
  let stats;

  if (props.stats.siteStats.scrapeCount) {
    stats = props.stats.siteStats;
  } else if (props.stats.state !== 'loading' && props.stats.siteStats.active !== true) {
    props.fetchAllStats();
  }

  let nowDateObj;
  let duration;
  let lastScrapeTime;
  if (stats && stats.endedAt && stats.createdAt) {
    nowDateObj = new Date(stats.fetched);
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
          <div className="date">
            {stats && stats.createdAt
              ? `as of ${nowDateObj.toLocaleTimeString('en-us', options)}`
              : 'hold on a second...'}
          </div>
        </div>
        <div className="group2">
          <StatSquare name="Scrape Runs" value={(stats && stats.scrapeCount) || 0} shorten={true} />
          <StatSquare name="Sites" value={(stats && stats.siteCount) || 0} shorten={true} />
        </div>
        <div className="group2">
          <StatSquare
            name="Sites Load Count"
            value={(stats && stats.siteLoadCount) || 0}
            shorten={true}
          />
          <StatSquare
            name="Torrent Load Count"
            value={(stats && stats.torrentLoadCount) || 0}
            shorten={true}
          />
        </div>
      </div>
      <div className="seperator">
        <div className="group2">
          <StatSquare name="Group Count" value={(stats && stats.groupCount) || 0} shorten={true} />
          <StatSquare name="Info Count" value={(stats && stats.infoCount) || 0} shorten={true} />
        </div>
        <div className="group2">
          <StatSquare
            name="Snapshot Count"
            value={(stats && stats.snapshotCount) || 0}
            shorten={true}
          />
          <StatSquare
            name="Torrent Count"
            value={(stats && stats.torrentCount) || 0}
            shorten={true}
          />
        </div>
        <div className="group2">
          <StatSquare name="Minute Scrape Time" value={duration || 0} />
          <StatSquare name="Last Scrape Run" value={lastScrapeTime || 0} />
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
