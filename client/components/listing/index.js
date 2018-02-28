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
import SimpleLine from '../charts/simpleLine';

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
    const combinedDateFormat = 'MMMM Do YYYY [at] hh:mm:ss a';
    const justFullDateFormat = 'MMMM Do YYYY';
    const justDateFormat = 'MM/DD/YYYY';
    const justTimeFormat = 'h:mm:ss a';

    const holderObj = {};

    this.state.infos.forEach((item, index) => {
      item.torrentSnapshots.forEach((snap, snapIndex) => {
        const foundObj = holderObj[snap.date];
        if (foundObj) {
          foundObj.seed += snap.seed;
          foundObj.leach += snap.leach;
        } else {
          holderObj[snap.date] = {
            date: snap.date,
            seed: snap.seed,
            leach: snap.leach,
          };
        }
      });
    });

    const keys = Object.keys(holderObj);
    const agg = [];
    keys.forEach(key => agg.push(holderObj[key]));

    return (
      <div>
        <div className="listing-header">{this.state.listing.name}</div>
        <div className="l-section-header">GENERAL Combined INFO</div>
        <div className="l-split-details">
          <div className="l-details">
            <div className="item">
              <div className="title">first discovered</div>
              <div className="value">
                <div>
                  <div>{moment(this.state.listing.createdAt).format(justFullDateFormat)}</div>
                  <div>{moment(this.state.listing.createdAt).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">uploads found</div>
              <div className="value">
                <div className="number">{this.state.infos.length}</div>
              </div>
            </div>
          </div>
          <div className="l-details">
            <div className="item">
              <div className="title">peers</div>
              <div className="value">
                <div className="center">
                  <SeedLeachPie
                    seed={this.state.infos.reduce((accum, curr) => accum + curr.seed, 0)}
                    leach={this.state.infos.reduce((accum, curr) => accum + curr.leach, 0)}
                  />
                </div>
              </div>
            </div>
          </div>
          {agg.length > 1 &&
            this.state.infos.length && (
              <div className="l-details">
                <div className="item">
                  <div className="title">history</div>
                  <div className="value">
                    <div className="center">
                      <SimpleLine
                        data={agg}
                        syncId="listings"
                        pluck={[
                          { key: 'seed', color: '#008000' },
                          { key: 'leach', color: '#ff0000' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        {<div className="l-section-header">uploads by users</div>}
        <div className="listings-infos">
          {this.state.infos &&
            this.state.infos.map(info => (
              <Link to={`/info/${info.id}`} key={info.id} className="item">
                <div className="header">
                  <div className="user">
                    <div className="value">{info.uploadUser}</div>
                    <div className="desc">upload user</div>
                  </div>
                  <div className="date">
                    <div className="value">
                      {moment(info.uploadDate).format(combinedDateFormat)}
                    </div>
                    <div className="desc">upload date</div>
                  </div>
                </div>
                <div className="details">
                  <div className="info">
                    <div className="info-group">
                      <div className="info-item">
                        <div className="label">listed as</div>
                        <div className="value">{info.category}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">torrent size</div>
                        <div className="value">{info.size}</div>
                      </div>
                    </div>

                    <div className="info-group">
                      <div className="info-item">
                        <div className="label">ratio</div>
                        <div className="value">{info.ratio}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">max ratio</div>
                        <div className="value">{info.maxLeach}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">min ratio</div>
                        <div className="value">{info.minLeach}</div>
                      </div>
                    </div>

                    <div className="info-group">
                      <div className="info-item">
                        <div className="label">seeders</div>
                        <div className="value">{info.seed}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">max seeders</div>
                        <div className="value">{info.maxSeed}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">min seeders</div>
                        <div className="value">{info.minSeed}</div>
                      </div>
                    </div>

                    <div className="info-group">
                      <div className="info-item">
                        <div className="label">leachers</div>
                        <div className="value">{info.leach}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">max leachers</div>
                        <div className="value">{info.maxLeach}</div>
                      </div>
                      <div className="info-item">
                        <div className="label">min leachers</div>
                        <div className="value">{info.minLeach}</div>
                      </div>
                    </div>
                  </div>
                  {agg.length > 1 ? (
                    <div className="chart">
                      <SyncLine
                        syncId="listings"
                        data={info.torrentSnapshots}
                        pluck={[
                          { key: 'seed', color: '#008000' },
                          { key: 'leach', color: '#ff0000' },
                        ]}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </Link>
            ))}
        </div>
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
