import React from 'react';
import { connect } from 'react-redux';

import Filter from './filter';
import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';
import './style.scss';

import InfoListItem from './infoListItem';

class TopNewSnapshots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      itemsPerPage: 20,
      intervalId: 0,
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    const intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId });
  }

  componentDidMount() {
    if (
      this.props.topNewSnapshots.state !== 'ready' &&
      this.props.topNewSnapshots.state !== 'loading'
    ) {
      this.props.load();
    }
  }

  onChangePage = (currentPage) => {
    console.log('current page change to', currentPage);
    this.setState({ currentPage });
    this.scrollToTop();
  };

  filterSortSnapshots = arraySnapshots =>
    arraySnapshots
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

  getArrayFromPage = (dataArray) => {
    const begin = this.state.currentPage * this.state.itemsPerPage;
    const end = begin + this.state.itemsPerPage;
    return dataArray.slice(begin, end);
  };

  render() {
    if (this.props.topNewSnapshots.state !== 'ready') {
      return <Loader message="random" />;
    }
    const filteredSnapshots = this.filterSortSnapshots(this.props.topNewSnapshots.items);
    const numberOfPages = Math.ceil(filteredSnapshots.length / this.state.itemsPerPage);
    const currentItems = this.getArrayFromPage(filteredSnapshots);
    const pageButtons = [];
    for (let x = 0; x < numberOfPages; x += 1) {
      pageButtons.push(<div
          className={
            x === this.state.currentPage
              ? 'top-filter-pagination-link-active'
              : 'top-filter-pagination-link'
          }
          key={`pagination${x}`}
          onClick={() => this.onChangePage(x)}
        >
          {x + 1}
        </div>);
    }

    return (
      <div className="top-container">
      <div className="top-header">TOP TORRENTS</div>
        <Filter
          count={filteredSnapshots.length}
          currentPage={this.state.currentPage + 1}
          numberOfPages={numberOfPages}
          onChangePage={() => this.onChangePage(0)}
        />
        {currentItems.map(snapshot => (
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
        <div className="top-filter-pagination">{pageButtons}</div>
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
