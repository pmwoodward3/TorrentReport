import React from 'react';
import { connect } from 'react-redux';
import SiteStats from '../siteStats';
import Notification from '../notification';
import DailyListing from '../dailyListing';
import TopSnapshotWeek from '../topSnapshotWeek';

import './style.scss';

/**
 * COMPONENT
 */
const Home = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      {!isLoggedIn && (
        <Notification title="What is Torrent Report?" linkText="Learn More" linkURI="/about">
          This is a torrent information platform and aggregator. This site does not create, host, or
          distribute any torrents or their files. Instead this site crawls and scrapes top torrent
          sites to get their top torrents.
        </Notification>
      )}
      <div className="flex-inline">
        <SiteStats />
        <DailyListing />
      </div>
      <div className="flex-inline">
        <TopSnapshotWeek />
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
