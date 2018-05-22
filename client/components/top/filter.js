import React from 'react';
import { connect } from 'react-redux';

import {
  enableAllSitesTopFilter,
  enableAllGroupsTopFilter,
  toggleGroupTopFilter,
  toggleSiteTopFilter,
} from '../../store/topFilter';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/fontawesome-free-solid';

import './filter.scss';

class Filter extends React.Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
  }
  /* eslint-enable */

  componentDidMount() {
    this.props.resetEverything();
  }

  render() {
    console.log('filter props', this.props);
    return (
      <div className="top-filter-list">
        <div className="top-filter-site">
          <div className="top-filter-site-group-name">{this.props.count} Results</div>
        </div>
        <div className="top-filter-site">
          <div className="top-filter-site-group-name">Groups</div>
          {this.props.groups.map(group => (
            <div key={`${group}thsgi`}>
              <div className="top-filter-site-item">
                <div
                  onClick={() => this.props.toggleGroup(group)}
                  className={
                    this.props.topFilter.showingGroups[group]
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={
                        this.props.topFilter.showingGroups[group] ? faCheckCircle : faTimesCircle
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
                  onClick={() => this.props.toggleSite(site.id)}
                  className={
                    this.props.topFilter.showingSites[site.id]
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={
                        this.props.topFilter.showingSites[site.id] ? faCheckCircle : faTimesCircle
                      }
                    />
                  </div>
                  <div className="top-filter-site-name">{site.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    return dispatch(toggleSiteTopFilter(siteId));
  },
  toggleGroup(groupName) {
    return dispatch(toggleGroupTopFilter(groupName));
  },
  resetEverything() {
    dispatch(enableAllSitesTopFilter);
    return dispatch(enableAllGroupsTopFilter);
  },
});

export default connect(mapState, mapDispatch)(Filter);
