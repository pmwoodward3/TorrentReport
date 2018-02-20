import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import {
  getOrFetchListingByID,
  getListingByID,
  getOrFetchInfosByID,
  getInfosByID,
} from '../store_helper';
import moment from 'moment';
import _ from 'lodash';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import './style.scss';
import SeedLeachPie from '../charts/seedLeachPie';
import SyncLine from '../charts/syncLine';

class Listing extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const safeId = parseInt(id, 10);
    const listing = getListingByID(safeId);
    const infos = listing.Infos || false;
    this.state = {
      listing,
      listingId: safeId || false,
      infos,
    };
  }

  componentDidMount() {
    if (!this.state.listing) getOrFetchListingByID(this.state.listingId);
  }

  componentWillReceiveProps(nextProps) {
    const listingId = this.state.listingId || parseInt(nextProps.match.params.id, 10);
    const listing = this.state.listing || getListingByID(listingId);
    const infos = this.state.infos || listing.Infos || false;
    if (!this.state.listing || !this.state.infos) this.setState({ listing, listingId, infos });
  }

  render() {
    if (!this.state.listing || !this.state.infos) return <Loader message="random" />;
    const agg = [];

    for (let h = 0; h < this.state.infos[0].length; h++) {
      const newObj = {};
      newObj.seed = 0;
      newObj.leach = 0;
      for (let i = 0; i < this.state.infos.length; i++) {
        newObj.date = this.state.infos[i][h].createdAt;
        newObj.seed += this.state.infos[i][h].seed;
        newObj.leach += this.state.infos[i][h].leach;
      }
      agg.push(newObj);
    }
    console.log(agg);

    return (
      <div>
        <h1>listing</h1>
        <b>{this.state.listing.name}</b>
        <p>we Found This Listing on: {this.state.listing.createdAt} </p>
        <p>FOUND INFOS ({this.state.infos.length}) </p>
        <div>
          <SeedLeachPie
            seed={this.state.infos.reduce((accum, curr) => accum + curr.seed, 0)}
            leach={this.state.infos.reduce((accum, curr) => accum + curr.leach, 0)}
          />
        </div>
        {this.state.infos &&
          this.state.infos.map(info => (
            <div key={info.id}>
              <p>
                <Link to={`/info/${info.id}`}>
                  #{info.id} - uploaded by: {info.uploadUser}
                </Link>{' '}
                | seed: {info.seed} (max: {info.maxSeed} | min: {info.minSeed}) - leach:{' '}
                {info.leach} (max: {info.maxLeach} | min: {info.minLeach}) | {info.uploadDate}
              </p>
              <SyncLine
                syncId="listings"
                data={info.torrentSnapshots}
                pluck={[{ key: 'seed', color: '#008000' }, { key: 'leach', color: '#ff0000' }]}
              />
            </div>
          ))}
      </div>
    );
  }
}

const mapState = state => ({
  listings: state.listings,
  infos: state.infos,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Listing);
