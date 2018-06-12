import React from 'react';
import { connect } from 'react-redux';

import Filter from './filter';
import { fetchTopNewSnapshots, setFilterVisibiility, changeCurrentPage } from '../../store';
import Loader from '../loader';
import './style.scss';

import InfoListItem from './infoListItem';
import PageButtonMaker from '../pagination/pageButtonMaker';

const scrollToTop = () => {
  window.scroll(0, 0);
};

const filterSortSnapshots = (arraySnapshots, topFilter) =>
  arraySnapshots
    .filter((snapshot) => {
      for (let x = 0; x < snapshot.torrentInfo.Group.length; x += 1) {
        const currentGroup = snapshot.torrentInfo.Group[x].name;
        const currentGroupSiteId = snapshot.torrentInfo.Group[x].torrentSite.id;
        if (topFilter.showingGroups[currentGroup] && topFilter.showingSites[currentGroupSiteId]) {
          return true;
        }
        return false;
      }
      return false;
    })
    .sort((a, b) => {
      const currentSortBy = topFilter.sortBy; // seed or leech
      const currentOrder = topFilter.sortOrder; // top or bottom
      if (currentOrder === 'top') {
        return b[currentSortBy] - a[currentSortBy];
      }
      return a[currentSortBy] - b[currentSortBy];
    });

const getArrayFromPage = (dataArray, topFilter) => {
  const begin = topFilter.currentPage * topFilter.itemsPerPage;
  const end = begin + topFilter.itemsPerPage;
  return dataArray.slice(begin, end);
};

const TopNewSnapshots = (props) => {
  if (props.topNewSnapshots.state !== 'ready') {
    if (props.topNewSnapshots.state !== 'loading') {
      props.load();
    }
    return <Loader message="random" />;
  }
  const filteredSnapshots = filterSortSnapshots(props.topNewSnapshots.items, props.topFilter);
  const numberOfPages = Math.ceil(filteredSnapshots.length / props.topFilter.itemsPerPage);
  const currentItems = getArrayFromPage(filteredSnapshots, props.topFilter);
  const pageButtons = [];
  for (let x = 0; x < numberOfPages; x += 1) {
    pageButtons.push(<div
        className={
          x === props.topFilter.currentPage
            ? 'top-filter-pagination-link-active'
            : 'top-filter-pagination-link'
        }
        key={`pagination${x}`}
        onClick={() => props.changePage(x)}
      >
        {x + 1}
      </div>);
  }

  return (
    <div className="top-container">
      <div className="top-header">CURRENT TORRENTS</div>
      <Filter
        count={filteredSnapshots.length}
        currentPage={props.topFilter.currentPage + 1}
        numberOfPages={numberOfPages}
        onChangePage={() => props.changePage(0)}
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
      <div className="top-filter-pagination">
        {numberOfPages > 1 && (
          <PageButtonMaker
            numberOfPages={numberOfPages}
            currentPage={props.topFilter.currentPage}
            changePageFunc={props.changePage}
            funcToCall={() => props.changeFilterVisibility(false)}
          />
        )}
      </div>
    </div>
  );
};

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
  topFilter: state.topFilter,
});

const mapDispatch = dispatch => ({
  changePage(pageNumber) {
    scrollToTop();
    return dispatch(changeCurrentPage(pageNumber));
  },
  changeFilterVisibility(visibility) {
    return dispatch(setFilterVisibiility(visibility));
  },
  load() {
    return dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(TopNewSnapshots);
