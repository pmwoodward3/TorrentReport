import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SiteStats from '../siteStats';

import s from './style.scss';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  const todaysDateObj = new Date();
  // const today24Hour =
  // if (date ) {

  // }
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <div>
      <div className="home-notification">
        <div className="home-notification-head">What is Torrent Report?</div>
        <div className="home-notification-text">
          Welcome home {email}. Torrent Report is a torrent information aggregator. This site does
          not create, host, or distribute any torrents or their files. Instead this site crawls top
          torrent sites to get their top torrents.
        </div>
        <div className="home-notification-action">
          <p>
            <Link to="/about">Learn More</Link>
          </p>
        </div>
      </div>
      <div className="flex-inline">
        <SiteStats />

        <div className="daily-listings">
          <div className="dl-header">NEWLY LISTED TOP TORRENTS</div>
          <div className="dl-item-group">
            <div className="dl-item">Torrent Name One</div>
          </div>
          <div className="dl-footer">footer space</div>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
});

export default connect(mapState)(Home);

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string,
};
