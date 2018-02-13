import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import s from './style.scss';

import { fetchStats } from '../../store';

import StatSquare from './statSquare';
/**
 * COMPONENT
 */
class SiteStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
    };
    // this.mainMenuToggle = this.mainMenuToggle.bind(this);
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const stats = this.props.siteStats;
    const nowDateObj = new Date();
    let duration,
      lastScrapeTime;
    if (stats.endedAt && stats.createdAt) {
      const endedDateObj = moment(stats.endedAt);
      const createdDateObj = moment(stats.createdAt);
      duration = endedDateObj.diff(createdDateObj, 'minutes', true); // 1;
      // console.log(endedDateObj.diff(createdDateObj, 'minutes', true));
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
            <StatSquare name="Script RUn COunt" value={stats.scrapeCount} />
            <StatSquare name="Site COunt" value={stats.siteCount} />
          </div>
          <div className="group2">
            <StatSquare name="Torrent Listing Count" value={stats.scrapeCount} />
            <StatSquare name="Torrent Load COunt" value={stats.siteCount} />
          </div>
        </div>
        <div className="seperator">
          <div className="group2">
            <StatSquare name="Group Count" value={stats.groupCount} />
            <StatSquare name="Info COunt" value={stats.infoCount} />
          </div>
          <div className="group2">
            <StatSquare name="Snapshot Count" value={stats.snapshotCount} />
            <StatSquare name="Site Load COunt" value={stats.siteLoadCount} />
          </div>
          <div className="group2">
            <StatSquare name="last scrape took (minutes)" value={duration} />
            <StatSquare name="last scrape run" value={lastScrapeTime} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

/**
 * CONTAINER
 */

const mapState = state => ({
  siteStats: state.stats.siteStats,
});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchStats());
  },
});

export default connect(mapState, mapDispatch)(SiteStats);

/**
 * PROP TYPES
 */
SiteStats.propTypes = {
  siteStats: PropTypes.object,
};
