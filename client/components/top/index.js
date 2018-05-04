import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';
import './style.scss';

class TopNewSnapshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading...',
    };
  }

  componentDidMount() {
    if (this.props.topNewSnapshots.state === 'init') {
      this.props.load();
    }
  }
  render() {
    const { groups, sites } = this.props;
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
    if (this.props.topNewSnapshots.state !== 'ready') return <Loader message="random" />;
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
        top page (count: {this.props.topNewSnapshots.items.length})
        <hr />
        {this.props.topNewSnapshots.items.map(snapshot => (
          <div key={snapshot.id}>
            {snapshot.torrentInfo.torrentListing.name} - (<Link
              to={`/listing/${snapshot.torrentInfo.torrentListing.id}`}
            >
              View Listing
            </Link>) (<Link to={`/info/${snapshot.torrentInfo.id}`}>View Info</Link>) - uploaded by:{' '}
            {snapshot.torrentInfo.uploadUser} -
            {snapshot.torrentInfo.Group.reduce(
              (accum, group) =>
                (accum += ` (${group.name} - ${group.tag} [${group.torrentSite.name}])`),
              '',
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
  sites: state.sites.items,
  groups: state.groups.items,
});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(mapState, mapDispatch)(TopNewSnapshots);
