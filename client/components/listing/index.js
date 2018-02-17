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

class Listing extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const safeId = parseInt(id, 10);
    const listing = getListingByID(safeId);
    const infos = getInfosByID(listing.infoIds);
    this.state = {
      listing,
      listingId: safeId || false,
      infos,
    };
  }

  componentDidMount() {
    if (!this.state.listing) getOrFetchListingByID(this.state.listingId);
    if (!this.state.infos) getOrFetchInfosByID(this.state.listing.infoIds);
  }

  componentWillReceiveProps(nextProps) {
    const listingId = this.state.listingId || parseInt(nextProps.match.params.id, 10);
    const listing = this.state.listing || getListingByID(listingId);
    const infos = this.state.infos || getInfosByID(listing.infoIds);
    if (!this.state.listing || !this.state.infos) this.setState({ listing, listingId, infos });
  }

  render() {
    if (!this.state.listing || !this.state.infos) return <Loader />;
    return (
      <div>
        <h1>listing</h1>
        <b>{this.state.listing.name}</b>
        <p>TR First Found This Listing on: {this.state.listing.createdAt} </p>
        <p>FOUND INFOS ({this.state.infos.length}) </p>
        {this.state.infos &&
          this.state.infos.map(info => (
            <p key={info.id}>
              <Link to={`/info/${info.id}`}>
                #{info.id} - uploaded by: {info.uploadUser}
              </Link>{' '}
              | seed: {info.seed} (max: {info.maxSeed} | min: {info.minSeed}) - leach: {info.leach}{' '}
              (max: {info.maxLeach} | min: {info.minLeach}) | {info.uploadDate}
            </p>
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
