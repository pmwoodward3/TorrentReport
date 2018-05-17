import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';
import './style.scss';

const TopNewSnapshots = (props) => {
  const { groups, sites } = props;
  const sitesArr = Object.keys(sites).map(key => sites[key]);
  const groupsArr = Object.keys(groups).map(key => groups[key]);
  const sitesWithGroups = sitesArr.map((site) => {
    const newSite = Object.assign({}, site);
    newSite.groups = groupsArr.filter(group => group.torrentSiteId === site.id);
    newSite.groupNames = newSite.groups.reduce(
      (arr, item) => (!arr.includes(item.name) ? [item.name, ...arr] : arr),
      [],
    );
    return newSite;
  });
  if (props.topNewSnapshots.state !== 'ready') {
    if (props.topNewSnapshots.state !== 'loading') props.load();
    return <Loader message="random" />;
  }
  return (
    <div className="top-container">
      <div className="top-header-list">
        <div className="top-header-site">
          {sitesWithGroups.map(site => (
            <div className="top-header-site-item" key={`${site.id}thsi`}>
              <h1>{site.name}</h1>
              <div className="top-header-site-groups">
                {site.groupNames.map(group => (
                  <div className="top-header-site-groups-item" key={`${site.id}thsi${group}`}>
                    {group}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      top page (count: {props.topNewSnapshots.items.length})
      <hr />
      {props.topNewSnapshots.items.map(snapshot => (
        <div key={snapshot.id}>
          {snapshot.torrentInfo.torrentListing.name} - (<Link
            to={`/listing/${snapshot.torrentInfo.torrentListing.id}`}
          >
            View Listing
          </Link>) (<Link to={`/info/${snapshot.torrentInfo.id}`}>View Info</Link>) - uploaded by:{' '}
          {snapshot.torrentInfo.uploadUser} -
          {snapshot.torrentInfo.Group.reduce(
            /* eslint-disable */
            (accum, group) =>
              (accum += ` (${group.name} - ${group.tag} [${group.torrentSite.name}])`),
            '' /* eslint-enable */,
          )}
        </div>
      ))}
    </div>
  );
};

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
  sites: state.sites.items,
  groups: state.groups.items,
});

const mapDispatch = dispatch => ({
  load() {
    return dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(mapState, mapDispatch)(TopNewSnapshots);
