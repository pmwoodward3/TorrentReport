import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SiteStats from '../siteStats';
import Notification from '../notification';
import DailyListing from '../dailyListing';

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
      <Notification title="What is Torrent Report?" linkText="Learn More" linkURI="/about">
        Welcome home {email}. Torrent Report is a torrent information aggregator. This site does not
        create, host, or distribute any torrents or their files. Instead this site crawls top
        torrent sites to get their top torrents.
      </Notification>
      <div className="flex-inline">
        <SiteStats />
        <DailyListing />
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
