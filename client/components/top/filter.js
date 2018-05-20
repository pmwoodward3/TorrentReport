import React from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/fontawesome-free-solid';

import './filter.scss';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingSites: this.prepSites(props.sites),
      showingGroups: this.prepGroups(props.groups),
    };
  }

  prepSites = sitesArr =>
    sitesArr.reduce((accum, curr) => {
      accum[curr.id] = true; // eslint-disable-line
      return accum;
    }, {});

  prepGroups = groupsArr =>
    groupsArr.reduce((accum, curr) => {
      accum[curr] = true; // eslint-disable-line
      return accum;
    }, {});

  propsToState = (sites, groups) => {
    if (
      Object.keys(this.state.showingSites).length !== sites.length &&
      Object.keys(this.state.showingGroups).length !== groups.length
    ) {
      this.setState({
        showingSites: this.prepSites(sites),
        showingGroups: this.prepGroups(groups),
      });
    }
  };

  toggleSite = (siteId) => {
    const newShowingSites = this.state.showingSites;
    newShowingSites[siteId] = !newShowingSites[siteId];
    this.setState({ newShowingSites });
  };

  toggleGroup = (groupName) => {
    const newShowingGroups = this.state.showingGroups;
    newShowingGroups[groupName] = !newShowingGroups[groupName];
    this.setState({ newShowingGroups });
  };

  render() {
    console.log('filter props', this.props);
    return (
      <div className="top-filter-list">
        <div className="top-filter-site">
          <div className="top-filter-site-group-name">Groups</div>
          {this.props.groups.map(group => (
            <div key={`${group}thsgi`}>
              <div className="top-filter-site-item">
                <div
                  onClick={() => this.toggleGroup(group)}
                  className={
                    this.state.showingGroups[group]
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={this.state.showingGroups[group] ? faCheckCircle : faTimesCircle}
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
                  onClick={() => this.toggleSite(site.id)}
                  className={
                    this.state.showingSites[site.id]
                      ? 'top-filter-site-head top-filter-site-head-active'
                      : 'top-filter-site-head'
                  }
                >
                  <div className="top-filter-site-icon">
                    <FontAwesomeIcon
                      icon={this.state.showingSites[site.id] ? faCheckCircle : faTimesCircle}
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
  sites: Object.keys(state.sites.items).map(key => state.sites.items[key]),
  groups: Object.keys(state.groups.items)
    .map(key => state.groups.items[key].name.toUpperCase())
    .filter((val, ind, arr) => arr.indexOf(val) === ind),
});

export default connect(mapState)(Filter);
