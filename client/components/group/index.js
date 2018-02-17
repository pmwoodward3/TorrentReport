import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import { getOrFetchGroupByID, getGroupByID } from '../store_helper';
import moment from 'moment';
import _ from 'lodash';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import './style.scss';

class Group extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    const safeId = parseInt(id, 10);
    const group = getGroupByID(safeId);
    this.state = {
      group,
      groupId: safeId || false,
    };
  }

  componentDidMount() {
    getOrFetchGroupByID(this.state.groupId);
  }

  componentWillReceiveProps(nextProps) {
    const groupId = this.state.groupId || parseInt(nextProps.match.params.id, 10);
    const group = this.state.group || getGroupByID(groupId);
    if (!this.state.group || !this.state.infos) this.setState({ group, groupId });
  }

  render() {
    if (!this.state.group || !this.state.groupId) return <Loader />;
    console.log(this.state);
    return (
      <div>
        <h1>group info</h1>
        <b>
          {this.state.group.name} (tag: {this.state.group.tag})
        </b>
        <p>createdAt : {this.state.group.createdAt}</p>
        <p>updatedAt : {this.state.group.updatedAt}</p>
        <p>url : {this.state.group.url}</p>
        <p>
          from site:{this.state.group.torrentSite.name}
          <Link to={`/site/${this.state.group.torrentSiteId}`}>
            View Details for {this.state.group.torrentSite.short}
          </Link>
        </p>
      </div>
    );
  }
}

const mapState = state => ({
  groups: state.groups,
  sites: state.sites,
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Group);
