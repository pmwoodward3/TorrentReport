import React from 'react';
import { connect } from 'react-redux';
import SiteStats from '../siteStats';
import Notification from '../notification';
import DailyListing from '../dailyListing';

import './style.scss';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email, isLoggedIn } = props;

  return (
    <div>
      {!isLoggedIn && (
        <Notification title="What is Torrent Report?" linkText="Learn More" linkURI="/about">
          Welcome home {email}. Torrent Report is a torrent information aggregator. This site does
          not create, host, or distribute any torrents or their files. Instead this site crawls top
          torrent sites to get their top torrents.
        </Notification>
      )}
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
  isLoggedIn: !!state.user.id,
});

export default connect(mapState)(Home);
