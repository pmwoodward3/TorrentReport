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
import './style.scss';
import LineChart from '../charts/snapshotLine';
import BasicToolTip from '../tooltip/basic';

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
  }

  componentDidMount() {
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
    console.log(this.state);
    if (!this.state.info || !this.state.infoId || !this.state.listing) {
      return <Loader message="random" />;
    }
    const combinedDateFormat = 'MMMM Do YYYY [at] hh:mm:ss a';
    const justFullDateFormat = 'MMMM Do YYYY';
    const justDateFormat = 'MM/DD/YYYY';
    const justTimeFormat = 'h:mm:ss a';
    return (
      <div>
        <div className="i-header">
          <div className="torrent-name">
            <div className="what">Torrent Listing</div>
            <div className="info">
              <Link to={`/listing/${this.state.listing.id}`}>{this.state.listing.name}</Link>
            </div>
          </div>
          <div className="upload-user">
            <div className="what">Uploading User</div>
            <div className="info">{this.state.info.uploadUser}</div>
          </div>
        </div>

        <div className="i-section-header">General Info</div>
        <div className="i-split-details">
          <div className="i-details">
            <div className="item">
              <div className="title">
                <div>uploaded on</div>
                <BasicToolTip message="The date listed as the upload date from the originating torrent site." />
              </div>
              <div className="value">
                <div>
                  <div>{moment(this.state.info.uploadDate).format(justFullDateFormat)}</div>
                  <div>{moment(this.state.info.uploadDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>upload discovered</div>
                <BasicToolTip message="The date we first saw this torrent in our scrapes." />
              </div>
              <div className="value">
                <div>
                  <div>{moment(this.state.info.createdAt).format(justFullDateFormat)}</div>
                  <div>{moment(this.state.info.createdAt).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>last scraped</div>
                <BasicToolTip message="The last date we scraped this torrent." />
              </div>
              <div className="value">
                <div>
                  <div>{moment(this.state.info.updatedAt).format(justFullDateFormat)}</div>
                  <div>{moment(this.state.info.updatedAt).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="i-details">
            <div className="item">
              <div className="title">
                <div>ratio</div>
                <BasicToolTip message="The current seed/leach ratio." />
              </div>
              <div className="value">
                <div className="number">{this.state.info.ratio}</div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>lowest ratio</div>
                <BasicToolTip message="The lowest seed/leach ratio and the date when we saw it." />
              </div>
              <div className="value">
                <div className="number-date">{this.state.info.minRatio}</div>
                <div className="date">
                  <div>{moment(this.state.info.minRatioDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.minRatioDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>highest ratio</div>
                <BasicToolTip message="The highest seed/leach ratio and the date when we saw it." />
              </div>
              <div className="value">
                <div className="number-date">{this.state.info.maxRatio}</div>
                <div className="date">
                  <div>{moment(this.state.info.maxRatioDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.maxRatioDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="i-details">
            <div className="item">
              <div className="title">
                <div>current seed</div>
                <BasicToolTip message="The current amount of users sharing this file." />
              </div>

              <div className="value">
                <div className="number i-seed">{this.state.info.seed}</div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>lowest seed</div>
                <BasicToolTip message="The lowest amount of users sharing this file and the date we saw it." />
              </div>

              <div className="value">
                <div className="number-date">{this.state.info.minSeed}</div>
                <div className="date">
                  <div>{moment(this.state.info.minSeedDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.minSeedDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>highest seed</div>
                <BasicToolTip message="The highest amount of users sharing this file and the date we saw it." />
              </div>
              <div className="value">
                <div className="number-date">{this.state.info.maxSeed}</div>
                <div className="date">
                  <div>{moment(this.state.info.maxSeedDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.maxSeedDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="i-details">
            <div className="item">
              <div className="title">
                <div>current leach</div>
                <BasicToolTip message="The current amount of users downloading this file." />
              </div>
              <div className="value">
                <div className="number i-leach">{this.state.info.leach}</div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>lowest leach</div>
                <BasicToolTip message="The lowest amount of users downloading this file and the date we saw it." />
              </div>
              <div className="value">
                <div className="number-date">{this.state.info.minLeach}</div>
                <div className="date">
                  <div>{moment(this.state.info.minLeachDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.minLeachDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <div>highest leach</div>
                <BasicToolTip message="The highest amount of users downloading this file and the date we saw it." />
              </div>
              <div className="value">
                <div className="number-date">{this.state.info.maxLeach}</div>
                <div className="date">
                  <div>{moment(this.state.info.maxLeachDate).format(justDateFormat)}</div>
                  <div>{moment(this.state.info.maxLeachDate).format(justTimeFormat)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="i-section-header">Snapshots</div>
        <div className="i-snapshots">
          {this.state.info.torrentSnapshots.length > 1 && (
            <div className="chart">
              <LineChart snapshots={this.state.info.torrentSnapshots} />
            </div>
          )}

          <div className="list">
            <div className="item">
              <div className="date">Date</div>
              <div className="time">Time</div>
              <div className="seed i-seed">seed</div>
              <div className="leach i-leach">leach</div>
            </div>
            {this.state.info.torrentSnapshots
              .sort((a, b) => {
                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
              })
              .map((snapshot, index) => (
                <div className="item" key={snapshot.id}>
                  <div className="date">{moment(snapshot.date).format(justDateFormat)}</div>
                  <div className="time">{moment(snapshot.date).format(justTimeFormat)}</div>
                  <div className="seed i-seed">{snapshot.seed}</div>
                  <div className="leach i-leach">{snapshot.leach}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="i-section-header">Groups</div>
        <div className="i-groups">
          {this.state.info.Group &&
            this.state.info.Group.map(GroupItem => (
              <div key={GroupItem.id} className="item">
                <div className="site">
                  <Link to={`/site/${GroupItem.torrentSite.id}`}>{GroupItem.torrentSite.name}</Link>
                </div>
                <div className="group">
                  <Link to={`/group/${GroupItem.id}`}>
                    {GroupItem.name} - {GroupItem.tag}
                  </Link>
                </div>
              </div>
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
