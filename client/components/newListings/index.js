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
import ListHeaderItem from './listHeaderItem';
import { getListingsByID } from '../store_helper';
import listHeaderItem from './listHeaderItem';

import { searchWithinArray } from '../search/searchUtils';

// data stream with recompose
// import { Observable } from "rxjs"
// import config from "recompose/rxjsObservableConfig"
// import {
//   setObservableConfig,
//   componentFromStream
// } from "recompose"
/**
 * COMPONENT
 */
class NewListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      search: '',
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }
  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) this.props.load();
  }
  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  toggleOrder(order) {
    this.setState({ order });
  }

  toggleFilter(filter) {
    this.setState({ filter });
  }

  searchChange(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (!_.has(this.props.dailyListings, 'days1')) {
      return (
        <div id="NL" className="new-listings">
          <Loader message="random" />
        </div>
      );
    }
    const orderArr = this.state.order === 'top' ? ['desc'] : ['asc'];
    const listings = this.props.dailyListings.days1;
    const orderedFiltered = _.orderBy(
      listings,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      orderArr,
    );
    const finalSize = searchWithinArray(orderedFiltered, this.state.search);
    return (
      <div id="NL" className="new-listings">
        <div className="dl-top">
          <div className="dl-header">TOP NEWLY LISTED TORRENTS</div>
          <div className="dl-detail">
            <input
              placeholder="search these listings..."
              id="nl-search"
              name="nl-search"
              onChange={this.searchChange}
            />{' '}
          </div>
        </div>
        <div className="dl-item-group">
          <ListHeaderItem order={this.state.order} active={this.state.filter} />
          {finalSize.map((item, index) => (
            <ListItem key={item.id} active={this.state.filter} index={index} item={item} />
          ))}
        </div>
        <div className="dl-footer">
          <div className="dl-more">thats all folks</div>
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

export default connect(mapState, mapDispatch)(NewListings);
