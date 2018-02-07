import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { email } = props;

  return (
    <div>
      <div>Welcome home {email}</div>
      <div className="stats">
        <div className="descr">
          <div className="top">TORRENT REPORT</div>
          <div className="head">STATISTICS</div>
        </div>
        <div className="group">
          <div className="name center">Sites</div>
          <div className="value center">2</div>
        </div>
        <div className="group">
          <div className="name center">Torrents</div>
          <div className="value center">2</div>
        </div>
        <div className="group">
          <div className="name center">Snapshots</div>
          <div className="value center">203</div>
        </div>
        <div className="group">
          <div className="name center">Snapshots</div>
          <div className="value center">203</div>
        </div>
        <div className="group">
          <div className="name center">Snapshots</div>
          <div className="value center">203</div>
        </div>
        <div className="group">
          <div className="name center">Snapshots</div>
          <div className="value center">203</div>
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
