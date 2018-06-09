import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Loader from '../loader';

import './style.scss';

import { fetchDailyListings } from '../../store';

import MiniListItem from './miniListItem';

/**
 * COMPONENT
 */
class DailyListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      max: 10,
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
    return filter === 'seed' ? 'leech' : 'seed';
  }

  toggleFilter() {
    this.setState({ filter: this.oppositeFilter(this.state.filter) });
  }

  shouldComponentUpdate(nextProps) {
    // eslint-disable-line class-methods-use-this
    return _.has(nextProps.dailyListings, 'days1');
  }

  render() {
    if (
      !_.has(this.props.dailyListings, 'days1') ||
      this.props.dailyListings.days1.status !== 'loaded'
    ) {
      return (
        <div id="DL" className="daily-listings">
          <Loader message="downloading data" />
        </div>
      );
    }
    const orderArr = this.state.order === 'top' ? ['desc'] : ['asc'];
    const { listings } = this.props.dailyListings.days1;
    const orderedFiltered = _.orderBy(
      listings,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      orderArr,
    );
    const finalSize = orderedFiltered.slice(0, this.state.max);
    const hiddenResults = orderedFiltered.length - this.state.max;
    return (
      <div id="DL" className="daily-listings">
        <div className="dl-top">
          <div className="dl-header">
            <Link to="/new/listings">TODAYS NEWLY DISCOVERED TORRENTS</Link>
          </div>
          <div className="dl-detail" />
        </div>
        {this.props.dailyListings.days1.status === 'loaded' &&
          !listings.length && (
            <div>
              <i>no new items</i>
            </div>
          )}
        {this.props.dailyListings.days1.status === 'loaded' &&
          listings.length && (
            <div className="dl-item-group">
              {finalSize.map((item, index) => (
                <MiniListItem key={item.id} active={this.state.filter} index={index} item={item} />
              ))}
            </div>
          )}
        {this.props.dailyListings.days1.status === 'loaded' &&
          listings.length && (
            <div className="dl-footer">
              <div className="dl-more">
                <Link to="/new/listings">View {hiddenResults} more results</Link>
              </div>
              <div className="dl-options">
                <div className="current">
                  sorted by {this.state.order} {this.state.filter}ers
                </div>
                <div className="try">
                  switch to{' '}
                  <a href="#DL" onClick={this.toggleFilter}>
                    {this.oppositeFilter()}ers
                  </a>{' '}
                  or{' '}
                  <a href="#DL" onClick={this.toggleOrder}>
                    {this.oppositeOrder()}
                  </a>
                </div>
              </div>
            </div>
          )}
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

export default connect(
  mapState,
  mapDispatch,
)(DailyListing);
