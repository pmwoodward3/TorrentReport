import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div className="stats">
          <div className="seperator">
            <div className="descr">
              <div className="top">TORRENT REPORT</div>
              <div className="head">STATISTICS</div>
              <div className="date">as of {todaysDateObj.toLocaleTimeString('en-us', options)}</div>
            </div>
            <div className="group2">
              <div className="group colorOne">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
              <div className="group colorTwo">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
            </div>
            <div className="group2">
              <div className="group colorOne">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Torrent Sites Scraped</div>
                </div>
              </div>
              <div className="group">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Sites Visited</div>
                </div>
              </div>
            </div>
          </div>
          <div className="seperator">
            <div className="group2">
              <div className="group">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Last Scrape Date</div>
                </div>
              </div>
              <div className="group">
                <div className="value center">2</div>
                <div className="name center">
                  <div className="pos">Last Scrape Time</div>
                </div>
              </div>
            </div>
            <div className="group2">
              <div className="group">
                <div className="value center">203</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
              <div className="group">
                <div className="value center">203</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
            </div>
            <div className="group2">
              <div className="group">
                <div className="value center">203</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
              <div className="group">
                <div className="value center">203</div>
                <div className="name center">
                  <div className="pos">Sites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-space-square" />
        <div className="daily-listings">here</div>
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
