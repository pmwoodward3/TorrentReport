import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import Loader from '../loader';

import './style.scss';

import { fetchDailyListings } from '../../store';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';

import ListItem from './listItem';
/**
 * COMPONENT
 */
class DailyListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      sort: 'top',
      max: 11,
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  componentDidMount() {
    if (this.props.dailyListings.length === 0) this.props.load();
  }

  oppositeSort(sort = this.state.sort) {
    return sort === 'top' ? 'bottom' : 'top';
  }

  toggleSort() {
    this.setState({ sort: this.oppositeSort(this.state.sort) });
  }
  oppositeFilter(filter = this.state.filter) {
    return filter === 'seed' ? 'leach' : 'seed';
  }

  toggleFilter() {
    this.setState({ filter: this.oppositeFilter(this.state.filter) });
  }

  render() {
    if (!this.props.dailyListings.length) {
      return (
        <div id="DL" className="daily-listings">
          <Loader message="downloading data" />
        </div>
      );
    }
    const sortArr = this.state.sort === 'top' ? ['desc'] : ['asc'];
    const sortedFiltered = _.orderBy(
      this.props.dailyListings,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      sortArr,
    );
    const finalSize = sortedFiltered.slice(0, this.state.max);
    return (
      <div id="DL" className="daily-listings">
        <div className="dl-header">TOP NEWLY LISTED TORRENTS</div>
        <div className="dl-item-group">
          {finalSize.map((item, index) => <ListItem key={item.id} index={index} item={item} />)}
        </div>
        <div className="dl-footer">
          <div className="dl-options">
            <div className="current">filtered by {this.state.filter}ers</div>
            <div className="try">
              switch to{' '}
              <a href="#DL" onClick={this.toggleFilter}>
                {this.oppositeFilter()}ers
              </a>
            </div>
            <div className="current">ordered by {this.state.sort} listings</div>
            <div className="try">
              switch to{' '}
              <a href="#DL" onClick={this.toggleSort}>
                {this.oppositeSort()}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  dailyListings: state.stats.dailyListings,
});

const mapDispatch = dispatch => ({
  load() {
    dispatch(fetchDailyListings(1));
  },
});

export default connect(mapState, mapDispatch)(DailyListing);
