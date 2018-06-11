import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faFilter,
  faTimes,
} from '@fortawesome/fontawesome-free-solid';

import {
  enableAllSitesTopFilter,
  enableAllGroupsTopFilter,
  toggleGroupTopFilter,
  toggleSiteTopFilter,
  sortByTopFilter,
  sortOrderTopFilter,
  toggleFilterVisibiility,
  toggleDirtyState,
} from '../../store/topFilter';

import './filter.scss';

class Filter extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
  }
  /* eslint-enable */

  render() {
    return (
      <div className="top-filter-list">
        <div className="top-filter-site-static">
          <div
            onClick={() => {
              this.props.toggleFilter();
            }}
            className="toggle-top-filter-site"
          >
            <FontAwesomeIcon icon={faFilter} />{' '}
            {!this.props.topFilter.visibility ? 'Show Filter' : 'Hide Filter'}
          </div>
          {this.props.topFilter.dirty && (
            <div
              onClick={() => {
                this.props.resetEverything();
                this.props.onChangePage();
              }}
              className="clear-top-filter-site"
            >
              <FontAwesomeIcon icon={faTimes} /> Clear Filter
            </div>
          )}
          <div className="count-top-filter-site count-top-filter-site-fixed">
            {`${this.props.count} Results `}
            {this.props.numberOfPages > 0 &&
              ` - Page ${this.props.currentPage} of ${this.props.numberOfPages}`}
          </div>
        </div>
        {this.props.topFilter.visibility && (
          <div className="top-filter-site-box">
            <div className="top-filter-site">
              <div className="top-filter-site-group-name">Groups</div>
              {this.props.groups.map(group => (
                <div key={`${group}thsgi`}>
                  <div className="top-filter-site-item">
                    <div
                      onClick={() => {
                        this.props.toggleGroup(group);
                        this.props.onChangePage();
                      }}
                      className={
                        this.props.topFilter.showingGroups[group]
                          ? 'top-filter-site-head top-filter-site-head-active'
                          : 'top-filter-site-head'
                      }
                    >
                      <div className="top-filter-site-icon">
                        <FontAwesomeIcon
                          icon={
                            this.props.topFilter.showingGroups[group]
                              ? faCheckCircle
                              : faTimesCircle
                          }
                        />
                      </div>
                      <div className="top-filter-site-name">{group}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="top-filter-site">
              <div className="top-filter-site-group-name">Sites</div>
              {this.props.sites.map(site => (
                <div key={`${site.id}thsi`}>
                  <div className="top-filter-site-item">
                    <div
                      onClick={() => {
                        this.props.toggleSite(site.id);
                        this.props.onChangePage();
                      }}
                      className={
                        this.props.topFilter.showingSites[site.id]
                          ? 'top-filter-site-head top-filter-site-head-active'
                          : 'top-filter-site-head'
                      }
                    >
                      <div className="top-filter-site-icon">
                        <FontAwesomeIcon
                          icon={
                            this.props.topFilter.showingSites[site.id]
                              ? faCheckCircle
                              : faTimesCircle
                          }
                        />
                      </div>
                      <div className="top-filter-site-name">{site.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="top-filter-site">
              <div className="top-filter-site-group-name">Order</div>
              <div className="top-filter-site-item">
                <div
                  onClick={() => {
                    this.props.toggleSortBy('seed');
                    this.props.onChangePage();
                  }}
                  className={
                    this.props.topFilter.sortBy === 'seed'
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortBy === 'seed' ? faCheckCircle : faTimesCircle}
                    />
                  </div>
                  <div className="top-filter-site-name">Seed</div>
                </div>
              </div>
              <div className="top-filter-site-item">
                <div
                  onClick={() => {
                    this.props.toggleSortBy('leech');
                    this.props.onChangePage();
                  }}
                  className={
                    this.props.topFilter.sortBy === 'leech'
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={this.props.topFilter.sortBy === 'leech' ? faCheckCircle : faTimesCircle}
                    />
                  </div>
                  <div className="top-filter-site-name">Leech</div>
                </div>
              </div>
            </div>
            <div className="top-filter-site">
              <div className="top-filter-site-group-name">Ordered by</div>
              <div className="top-filter-site-item">
                <div
                  onClick={() => {
                    this.props.toggleSortOrder('top');
                    this.props.onChangePage();
                  }}
                  className={
                    this.props.topFilter.sortOrder === 'top'
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={
                        this.props.topFilter.sortOrder === 'top' ? faCheckCircle : faTimesCircle
                      }
                    />
                  </div>
                  <div className="top-filter-site-name">Highest</div>
                </div>
              </div>
              <div className="top-filter-site-item">
                <div
                  onClick={() => {
                    this.props.toggleSortOrder('bottom');
                    this.props.onChangePage();
                  }}
                  className={
                    this.props.topFilter.sortOrder === 'bottom'
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={
                        this.props.topFilter.sortOrder === 'bottom' ? faCheckCircle : faTimesCircle
                      }
                    />
                  </div>
                  <div className="top-filter-site-name">Lowest</div>
                </div>
              </div>
            </div>
            {/* <hr className="top-filter-list-hr" /> */}
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  topFilter: state.topFilter,
  sites: Object.keys(state.topFilter.showingSites).map(siteId => state.sites.items[siteId]),
  groups: Object.keys(state.topFilter.showingGroups),
});

const mapDispatch = dispatch => ({
  toggleSite(siteId) {
    dispatch(toggleDirtyState(true));
    return dispatch(toggleSiteTopFilter(siteId));
  },
  toggleGroup(groupName) {
    dispatch(toggleDirtyState(true));
    return dispatch(toggleGroupTopFilter(groupName));
  },
  toggleSortOrder(sortOrder) {
    dispatch(toggleDirtyState(true));
    return dispatch(sortOrderTopFilter(sortOrder));
  },
  toggleSortBy(sortBy) {
    dispatch(toggleDirtyState(true));
    return dispatch(sortByTopFilter(sortBy));
  },
  resetEverything() {
    dispatch(toggleDirtyState(false));
    dispatch(sortByTopFilter('seed'));
    dispatch(sortOrderTopFilter('top'));
    dispatch(enableAllSitesTopFilter());
    return dispatch(enableAllGroupsTopFilter());
  },
  toggleFilter() {
    return dispatch(toggleFilterVisibiility());
  },
});

export default connect(
  mapState,
  mapDispatch,
)(Filter);
