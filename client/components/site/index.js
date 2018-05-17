import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { fetchGroups } from '../../store';
import Loader from '../loader';
import './style.scss';

const Site = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const site = props.sites.items[id] || props.fetchAllGroups();
  if (!site) return <Loader message="random" />;
  const groupsObj = _.filter(props.groups.items, group => group.torrentSiteId === id);
  const groups = Object.keys(groupsObj).map(key => groupsObj[key]);
  return (
    <div>
      <h1>site info</h1>
      <b> {site.name}</b>
      <p> short: {site.short}</p>
      <p> url: {site.url}</p>
      <p> createdAt: {moment(site.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p> updatedAt: {moment(site.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <div>
        {groups.map(groupItem => (
          <p key={groupItem.id}>
            <Link to={`/group/${groupItem.id}`}>
              {groupItem.name} ({groupItem.tag})
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

const mapState = state => ({
  groups: state.groups,
  sites: state.sites,
});

const mapDispatch = dispatch => ({
  fetchAllGroups: () => dispatch(fetchGroups()),
});

export default connect(mapState, mapDispatch)(Site);
