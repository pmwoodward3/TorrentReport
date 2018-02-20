import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';

class TopNewSnapshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading...',
    };
  }

  componentDidMount() {
    if (
      this.props.topNewSnapshots.state !== 'loading' ||
      this.props.topNewSnapshots.state !== 'ready'
    ) {
      this.props.load();
    }
  }
  render() {
    if (this.props.topNewSnapshots.state !== 'ready') return <Loader message="random" />;
    return (
      <div>
        top page (count: {this.props.topNewSnapshots.items.length})
        <hr />
        {this.props.topNewSnapshots.items.map(snapshot => (
          <div key={snapshot.id}>
            {snapshot.torrentInfo.torrentListing.name} - (<Link
              to={`/listing/${snapshot.torrentInfo.torrentListing.id}`}
            >
              View Listing
            </Link>) (<Link to={`/info/${snapshot.torrentInfo.id}`}>View Info</Link>){' '}
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(mapState, mapDispatch)(TopNewSnapshots);
