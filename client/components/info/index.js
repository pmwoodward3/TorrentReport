import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { fetchInfoById } from '../../store';

import Loader from '../loader';
import './style.scss';
import SnapshotLine from '../charts/snapshotLine';
import BasicToolTip from '../tooltip/basic';

const Info = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const info = props.infos.items[id] || props.fetchInfo(id);
  const listing = props.listings.items[info.torrentListingId] || info.torrentListing;
  if (!info || !listing) return <Loader message="random" />;
  // const combinedDateFormat = 'MMMM Do YYYY [at] hh:mm:ss a';
  const justFullDateFormat = 'MMMM Do YYYY';
  const justDateFormat = 'MM/DD/YYYY';
  const justTimeFormat = 'h:mm:ss a';
  const sortedSnapshots = info.torrentSnapshots.slice().sort((lhs, rhs) => {
    const leftDate = new Date(lhs.date);
    const rightDate = new Date(rhs.date);
    if (leftDate > rightDate) {
      return 1;
    } else if (leftDate < rightDate) {
      return -1;
    }
    return 0;
  });

  return (
    <div>
      <div className="i-header">
        <div className="torrent-name">
          <div className="what">Torrent Listing</div>
          <div className="info">
            {listing && <Link to={`/listing/${listing.id}`}>{listing.name}</Link>}
          </div>
        </div>
        <div className="upload-user">
          <div className="what">Uploading User</div>
          <div className="info">{info.uploadUser}</div>
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
                <div>{moment(info.uploadDate).format(justFullDateFormat)}</div>
                <div>{moment(info.uploadDate).format(justTimeFormat)}</div>
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
                <div>{moment(info.createdAt).format(justFullDateFormat)}</div>
                <div>{moment(info.createdAt).format(justTimeFormat)}</div>
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
                <div>{moment(info.updatedAt).format(justFullDateFormat)}</div>
                <div>{moment(info.updatedAt).format(justTimeFormat)}</div>
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
              <div className="number">{info.ratio}</div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>lowest ratio</div>
              <BasicToolTip message="The lowest seed/leach ratio and the date when we saw it." />
            </div>
            <div className="value">
              <div className="number-date">{info.minRatio}</div>
              <div className="date">
                <div>{moment(info.minRatioDate).format(justDateFormat)}</div>
                <div>{moment(info.minRatioDate).format(justTimeFormat)}</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>highest ratio</div>
              <BasicToolTip message="The highest seed/leach ratio and the date when we saw it." />
            </div>
            <div className="value">
              <div className="number-date">{info.maxRatio}</div>
              <div className="date">
                <div>{moment(info.maxRatioDate).format(justDateFormat)}</div>
                <div>{moment(info.maxRatioDate).format(justTimeFormat)}</div>
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
              <div className="number i-seed">{info.seed}</div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>lowest seed</div>
              <BasicToolTip message="The lowest amount of users sharing this file and the date we saw it." />
            </div>

            <div className="value">
              <div className="number-date">{info.minSeed}</div>
              <div className="date">
                <div>{moment(info.minSeedDate).format(justDateFormat)}</div>
                <div>{moment(info.minSeedDate).format(justTimeFormat)}</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>highest seed</div>
              <BasicToolTip message="The highest amount of users sharing this file and the date we saw it." />
            </div>
            <div className="value">
              <div className="number-date">{info.maxSeed}</div>
              <div className="date">
                <div>{moment(info.maxSeedDate).format(justDateFormat)}</div>
                <div>{moment(info.maxSeedDate).format(justTimeFormat)}</div>
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
              <div className="number i-leach">{info.leach}</div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>lowest leach</div>
              <BasicToolTip message="The lowest amount of users downloading this file and the date we saw it." />
            </div>
            <div className="value">
              <div className="number-date">{info.minLeach}</div>
              <div className="date">
                <div>{moment(info.minLeachDate).format(justDateFormat)}</div>
                <div>{moment(info.minLeachDate).format(justTimeFormat)}</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <div>highest leach</div>
              <BasicToolTip message="The highest amount of users downloading this file and the date we saw it." />
            </div>
            <div className="value">
              <div className="number-date">{info.maxLeach}</div>
              <div className="date">
                <div>{moment(info.maxLeachDate).format(justDateFormat)}</div>
                <div>{moment(info.maxLeachDate).format(justTimeFormat)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="i-section-header">Snapshots</div>
      <div className="i-snapshots">
        {sortedSnapshots.length > 1 && (
          <div className="chart">
            <SnapshotLine data={sortedSnapshots} />
          </div>
        )}

        <div className="list">
          <div className="item">
            <div className="date">Date</div>
            <div className="time">Time</div>
            <div className="seed i-seed">seed</div>
            <div className="leach i-leach">leach</div>
          </div>
          {sortedSnapshots.map(snapshot => (
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
        {info.Group &&
          info.Group.map(GroupItem => (
            <div key={GroupItem.id} className="item">
              <div className="site">
                <Link to={`/site/${GroupItem.torrentSite.id}`}>{GroupItem.torrentSite.name}</Link>
              </div>
              <div className="group">
                <Link to={`/group/${GroupItem.id}`}>{GroupItem.tag}</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapState = state => ({
  infos: state.infos,
  listings: state.listings,
});

const mapDispatch = dispatch => ({
  fetchInfo: (id) => {
    dispatch(fetchInfoById(id));
    return false;
  },
});

export default connect(mapState, mapDispatch)(Info);
