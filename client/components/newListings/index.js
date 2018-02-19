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
import { getListingsByID } from '../store_helper';

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
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) this.props.load();
  }

  oppositeOrder(order = this.state.order) {
    return order === 'top' ? 'bottom' : 'top';
  }

  toggleOrder() {
    this.setState({ order: this.oppositeOrder(this.state.order) });
  }
  oppositeFilter(filter = this.state.filter) {
    return filter === 'seed' ? 'leach' : 'seed';
  }

  toggleFilter() {
    this.setState({ filter: this.oppositeFilter(this.state.filter) });
  }

  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  render() {
    if (!_.has(this.props.dailyListings, 'days1')) {
      return (
        <div id="NL" className="new-listings">
          <Loader message="fetching some data" />
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
    const finalSize = orderedFiltered;
    return (
      <div id="NL" className="new-listings">
        <div className="dl-top">
          <div className="dl-header">TOP NEWLY LISTED TORRENTS</div>
          <div className="dl-detail" />
        </div>
        <div className="dl-item-group">
          {finalSize.map((item, index) => (
            <ListItem key={item.id} active={this.state.filter} index={index} item={item} />
          ))}
        </div>
        <div className="dl-footer">
          <div className="dl-more">thats all folks</div>
          <div className="dl-options">
            <div>
              <div className="current">sorted by {this.state.filter}ers</div>
              <div className="try">
                switch to{' '}
                <a href="#DL" onClick={this.toggleFilter}>
                  {this.oppositeFilter()}ers
                </a>
              </div>
            </div>
            <div>
              <div className="current">ordered by {this.state.order} listings</div>
              <div className="try">
                switch to{' '}
                <a href="#DL" onClick={this.toggleOrder}>
                  {this.oppositeOrder()}
                </a>
              </div>
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

export default connect(mapState, mapDispatch)(NewListings);
