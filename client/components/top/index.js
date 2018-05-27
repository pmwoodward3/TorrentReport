import React from 'react';
import { connect } from 'react-redux';
// import JwPagination from 'jw-react-pagination';

import Filter from './filter';
import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';
import './style.scss';

import InfoListItem from './infoListItem';

class TopNewSnapshots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
    };
  }

  componentDidMount() {
    if (this.props.topNewSnapshots.state !== 'ready') {
      if (this.props.topNewSnapshots.state !== 'loading') this.props.load();
    }
  }

  render() {
    if (this.props.topNewSnapshots.state !== 'ready') {
      return <Loader message="random" />;
    }
    const filteredSnapshots = this.props.topNewSnapshots.items
      .filter((snapshot) => {
        for (let x = 0; x < snapshot.torrentInfo.Group.length; x += 1) {
          const currentGroup = snapshot.torrentInfo.Group[x].name;
          const currentGroupSiteId = snapshot.torrentInfo.Group[x].torrentSite.id;
          if (
            this.props.topFilter.showingGroups[currentGroup] &&
            this.props.topFilter.showingSites[currentGroupSiteId]
          ) {
            return true;
          }
          return false;
        }
        return false;
      })
      .sort((a, b) => {
        const currentSortBy = this.props.topFilter.sortBy; // seed or leech
        const currentOrder = this.props.topFilter.sortOrder; // top or bottom
        if (currentOrder === 'top') {
          return b[currentSortBy] - a[currentSortBy];
        }
        return a[currentSortBy] - b[currentSortBy];
      });
    return (
      <div className="top-container">
        <Filter count={filteredSnapshots.length} />
        {filteredSnapshots.map(snapshot => (
          <InfoListItem
            listingId={snapshot.torrentInfo.torrentListing.id}
            listingName={snapshot.torrentInfo.torrentListing.name}
            seed={snapshot.seed}
            leech={snapshot.leech}
            uploadDate={snapshot.torrentInfo.uploadDate}
            uploader={snapshot.torrentInfo.uploadUser}
            groupsArr={snapshot.torrentInfo.Group}
            key={snapshot.id}
          />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
  topFilter: state.topFilter,
});

const mapDispatch = dispatch => ({
  load() {
    return dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(mapState, mapDispatch)(TopNewSnapshots);
