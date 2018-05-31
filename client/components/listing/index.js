import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Loader from '../loader';
import './style.scss';
import SeedLeechPie from '../charts/seedLeechPie';
import SyncLine from '../charts/syncLine';
import SimpleLine from '../charts/simpleLine';
import { fetchListingById } from '../../store';

const Listing = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const listing = props.listings.items[id] || props.fetchListing(id);
  const infos = listing ? listing.Infos : false;
  if (!listing || !infos) return <Loader message="random" />;
  // const combinedDateFormat = 'MMMM Do YYYY [at] hh:mm:ss a';
  const justFullDateFormat = 'MMMM Do YYYY';
  const justTimeFormat = 'h:mm:ss a';

  const holderObj = {};

  infos.forEach((item) => {
    item.torrentSnapshots.forEach((snap) => {
      const generalDate = moment(new Date(snap.date)).format('MM/DD/YYYY');
      if (holderObj[generalDate]) {
        if (snap.seed > holderObj[generalDate].seed) holderObj[generalDate].seed = snap.seed;
        if (snap.leech > holderObj[generalDate].leech) holderObj[generalDate].leech = snap.leech;
      } else {
        holderObj[generalDate] = {
          date: generalDate,
          seed: snap.seed,
          leech: snap.leech,
        };
      }
    });
  });

  const aggregateSnapshotCount = Object.keys(holderObj).map(key => holderObj[key]);

  return (
    <div>
      <div className="listing-header">{listing.name}</div>
      <div className="l-section-header">GENERAL Combined INFO</div>
      <div className="l-split-details">
        <div className="l-details">
          <div className="item">
            <div className="title">first discovered</div>
            <div className="value">
              <div>
                <div>{moment(listing.createdAt).format(justFullDateFormat)}</div>
                <div>{moment(listing.createdAt).format(justTimeFormat)}</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">uploads found</div>
            <div className="value">
              <div className="number">{infos.length}</div>
            </div>
          </div>
        </div>
        <div className="l-details">
          <div className="item">
            <div className="title">peers</div>
            <div className="value">
              <div className="center">
                <SeedLeechPie
                  seed={infos.reduce((accum, curr) => accum + curr.seed, 0)}
                  leech={infos.reduce((accum, curr) => accum + curr.leech, 0)}
                />
              </div>
            </div>
          </div>
        </div>
        {aggregateSnapshotCount.length > 1 &&
          infos.length && (
            <div className="l-details">
              <div className="item">
                <div className="title">history</div>
                <div className="value">
                  <div className="center">
                    <SimpleLine
                      data={aggregateSnapshotCount}
                      syncId="listings"
                      pluck={[
                        { key: 'seed', color: '#008000' },
                        { key: 'leech', color: '#ff0000' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {<div className="l-section-header">uploads by users (CLICK ONE FOR MORE INFO)</div>}
      <div className="listings-infos">
        {infos &&
          infos.map(info => (
            <Link to={`/info/${info.id}`} key={info.id} className="item">
              <div className="header">
                <div className="user">
                  <div className="value">{info.uploadUser}</div>
                  <div className="desc">upload user</div>
                </div>
                <div className="date">
                  <div className="value">{moment(info.uploadDate).format(justFullDateFormat)}</div>
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
                      <div className="value">{info.maxLeech}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">min ratio</div>
                      <div className="value">{info.minLeech}</div>
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
                      <div className="label">leechers</div>
                      <div className="value">{info.leech}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">max leechers</div>
                      <div className="value">{info.maxLeech}</div>
                    </div>
                    <div className="info-item">
                      <div className="label">min leechers</div>
                      <div className="value">{info.minLeech}</div>
                    </div>
                  </div>
                </div>
                {aggregateSnapshotCount.length > 1 ? (
                  <div className="chart">
                    <SyncLine
                      syncId="listings"
                      data={info.torrentSnapshots}
                      pluck={[
                        { key: 'seed', color: '#008000' },
                        { key: 'leech', color: '#ff0000' },
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
};

const mapState = state => ({
  listings: state.listings,
  infos: state.infos,
});

const mapDispatch = dispatch => ({
  fetchListing: (id) => {
    dispatch(fetchListingById(id));
    return false;
  },
});

export default connect(mapState, mapDispatch)(Listing);
