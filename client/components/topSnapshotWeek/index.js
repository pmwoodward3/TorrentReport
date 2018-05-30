import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import { fetchTopWeekNewSnapshots } from '../../store';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

import './style.scss';

class topSnapshotWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentDidMount() {
    if (
      this.props.topWeekSnapshots.state !== 'ready' &&
      this.props.topWeekSnapshots.state !== 'loading'
    ) {
      this.props.load();
    }
  }

  render() {
    if (this.props.topWeekSnapshots.state !== 'ready') {
      return (
        <div className="top-week-stats-box-loading">
          <Loader />
        </div>
      );
    }
    return (
      <div className="top-week-stats-box">
        <div className="top-week-stats-box-header">this week's peak count</div>
        <div className="col-container-holder">
          <div className="col-container">
            <div className="col-container-header">Most Seeded</div>
            <div className="col-container-list">
              {this.props.topWeekSnapshots.seed.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/listing/${item.torrentInfo.torrentListing.id}`}
                  className="col-container-list-item"
                >
                  <div className="number">{index + 1}</div>
                  <div className="top">
                    <div className="col-container-list-item-title">
                      {`${item.torrentInfo.torrentListing.name}`}
                    </div>
                    <div className="row">
                    <div className="col-container-list-item-count">
                      <FontAwesomeIcon icon={faCaretUp} />
                      {`${item.seed}`}
                    </div>
                    <div className="col-container-list-item-count">
                      <FontAwesomeIcon icon={faCaretDown} />
                      {`${item.leech}`}
                    </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-container">
            <div className="col-container-header">Most Leeched</div>
            <div className="col-container-list">
              {this.props.topWeekSnapshots.leech.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/listing/${item.torrentInfo.torrentListing.id}`}
                  className="col-container-list-item"
                >
                  <div className="number">{index + 1}</div>
                  <div className="top">
                    <div className="col-container-list-item-title">
                      {`${item.torrentInfo.torrentListing.name}`}
                    </div>
                    <div className="row">
                    <div className="col-container-list-item-count">
                      <FontAwesomeIcon icon={faCaretUp} />
                      {`${item.seed}`}
                    </div>
                    <div className="col-container-list-item-count">
                      <FontAwesomeIcon icon={faCaretDown} />
                      {`${item.leech}`}
                    </div></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  topWeekSnapshots: state.stats.topWeekSnapshots,
});

const mapDispatch = dispatch => ({
  load() {
    return dispatch(fetchTopWeekNewSnapshots());
  },
});

export default connect(mapState, mapDispatch)(topSnapshotWeek);
