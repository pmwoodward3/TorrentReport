import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import { getSiteByID, getOrFetchSiteByID } from '../store_helper';
import moment from 'moment';
import _ from 'lodash';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import './style.scss';

class Site extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const safeId = parseInt(id, 10);
    const site = getSiteByID(safeId);
    let groups = false;
    if (site) {
      groups = _.filter(props.groups.items, groupItem => groupItem.torrentSiteId === safeId);
    }
    this.state = {
      site,
      siteId: safeId,
      groups,
    };
  }

  componentDidMount() {
    getOrFetchSiteByID(this.state.siteId);
  }

  componentWillReceiveProps(nextProps) {
    const siteId = this.state.siteId || parseInt(nextProps.match.params.id, 10);
    const site = this.state.site || getSiteByID(siteId);
    let { groups } = this.state;
    if (site && !groups) {
      groups = _.filter(nextProps.groups.items, groupItem => groupItem.torrentSiteId === site.id);
    }
    if (!this.state.site || !this.state.groups || !this.state.siteId) {
      this.setState({ site, siteId, groups });
    }
  }

  render() {
    if (!this.state.site || !this.state.siteId || !this.state.groups) return <Loader />;
    const { groups } = this.state;
    return (
      <div>
        <h1>site info</h1>
        <b> {this.state.site.name}</b>
        <p> short: {this.state.site.short}</p>
        <p> url: {this.state.site.url}</p>
        <p> createdAt: {this.state.site.createdAt}</p>
        <p> updatedAt: {this.state.site.updatedAt}</p>
        <div>
          {groups &&
            groups.length > 0 &&
            groups.map(groupItem => (
              <p key={groupItem.id}>
                <Link to={`/group/${groupItem.id}`}>
                  {groupItem.name} ({groupItem.tag})
                </Link>
              </p>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  sites: state.sites,
  groups: state.groups,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Site);
