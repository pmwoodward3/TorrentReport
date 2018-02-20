import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import {
  getInfoByID,
  getOrFetchInfoByID,
  getListingByID,
  getOrFetchListingByID,
} from '../store_helper';
import moment from 'moment';
import _ from 'lodash';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import './style.scss';
import LineChart from '../charts/snapshotLine';

class Info extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const safeId = parseInt(id, 10);
    const info = getInfoByID(safeId);
    const listing = getListingByID(info.torrentListingId);
    this.state = {
      infoId: safeId || false,
      info,
      listing,
    };
    console.log('constructor props', this.props);
  }

  componentDidMount() {
    console.log('mounting');
    if (!this.state.info) {
      const haveInfoId = getOrFetchInfoByID(this.state.infoId);
      if (haveInfoId) this.setState({ info: haveInfoId });
    }
  }

  componentWillReceiveProps(nextProps) {
    const infoId = this.state.infoId || parseInt(nextProps.match.params.id, 10);
    const info = this.state.info || getInfoByID(infoId);
    const listing = this.state.listing || getListingByID(info.torrentListingId);
    if (info && !listing) {
      getOrFetchListingByID(info.torrentListingId);
    }
    if (!this.state.info || !this.state.listing || !this.state.infoId) {
      this.setState({ info, infoId, listing });
    }
  }

  render() {
    if (!this.state.info || !this.state.infoId || !this.state.listing) return <Loader />;
    return (
      <div>
        <h1>INFO FOR UPLOAD BY:</h1>
        <h2>{this.state.info.uploadUser}</h2>
        <h2>torrent name: {this.state.listing.name} (<Link to={`/listing/${this.state.listing.id}`}>info</Link>)</h2>
        <b>
          {' '}
          User {this.state.info.uploadUser} listed this torrent on {moment(this.state.info.uploadDate).format('MMMM Do YYYY, h:mm:ss a')}
        </b>
        <h2>Snapshots</h2>
        <LineChart snapshots={this.state.info.torrentSnapshots} />
        {this.state.info.torrentSnapshots.map((snapshot, index) => (
          <div key={snapshot.id}>
          {moment(snapshot.date).format('MMMM Do YYYY, h:mm:ss a')} - seed: {snapshot.seed} | leach:{' '}
            {snapshot.leach}
          </div>
        ))}
        <h2>Groups</h2>
        <div>
          {this.state.info.Group &&
            this.state.info.Group.map(GroupItem => (
              <p key={GroupItem.id}>
                <Link to={`/group/${GroupItem.id}`}>
                  {GroupItem.name} - {GroupItem.tag}
                </Link>{' '}
                on{' '}
                <Link to={`/site/${GroupItem.torrentSite.id}`}>{GroupItem.torrentSite.name}</Link>
              </p>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  infos: state.infos,
  listings: state.listings,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Info);
