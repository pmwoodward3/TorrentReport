import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './style.scss';

import Loader from '../loader';
import { fetchDailyListings } from '../../store';

import ListItem from './listItem';
import ListHeaderItem from './listHeaderItem';

// import searchWithinArray from '../search/searchArray';
import worker from './filterWorker';

class NewListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'seed',
      order: 'top',
      search: '',
      searchResults: [],
      searching: false,
    };

    this.workerHolder = undefined;
    this.initWorker();
  }
  componentDidMount() {
    if (!_.has(this.props.dailyListings, 'days1')) this.props.load();
  }

  // eslint-disable-next-line
  shouldComponentUpdate(nextProps) {
    return _.has(nextProps.dailyListings, 'days1');
  }

  toggleOrder = (order) => {
    this.setState({ order });
  };

  toggleFilter = (filter) => {
    this.setState({ filter });
  };

  searchChange = (event) => {
    const searchInput = event.target.value;
    if (!searchInput.trim().length) {
      return this.setState({ search: '', searching: false, searchResults: [] });
    }
    this.setState({ search: searchInput, searching: true });
    const isMoreGeneral = searchInput.length < this.state.search;
    const arrToUse =
      this.state.searchResults.length && isMoreGeneral
        ? this.state.searchResults
        : this.props.dailyListings.days1;
    return this.sendSearchToWorker(arrToUse, searchInput);
  };

  sendSearchToWorker = (array, target) => {
    this.initWorker();
    this.workerHolder.postMessage({ array, target });
  };

  killWorker = () => {
    if (this.workerHolder) {
      this.workerHolder.terminate();
      this.workerHolder = undefined;
    }
  };
  initWorker = () => {
    this.killWorker();

    this.workerHolder = new Worker(worker); // eslint-disable-line
    this.workerHolder.onmessage = (m) => {
      const { result } = m.data;
      this.setState({ searchResults: result, searching: false });
    };
  };

  render() {
    if (
      !_.has(this.props.dailyListings, 'days1') ||
      this.props.dailyListings.days1.status !== 'loaded'
    ) {
      return (
        <div id="NL" className="new-listings">
          <Loader message="random" />
        </div>
      );
    }
    const orderArr = this.state.order === 'top' ? ['desc'] : ['asc'];

    const arrToStartWith = this.props.dailyListings.days1.listings;
    const finalSize = _.orderBy(
      arrToStartWith,
      (obj) => {
        const data = obj.Infos.reduce((acc, curr) => acc + curr[this.state.filter], 0);
        return data;
      },
      orderArr,
    );

    return (
      <div id="NL" className="new-listings">
        <div className="dl-top">
          <div className="dl-header">NEWLY LISTED TORRENTS</div>
          <div className="dl-detail">
            {this.state.searching && 'searching'}
            <input
              placeholder="search these listings..."
              id="nl-search"
              name="nl-search"
              onChange={this.searchChange}
            />
          </div>
        </div>
        {this.props.dailyListings.days1.status === 'loaded' &&
          finalSize.length === 0 && (
            <div>
              {!this.state.search ? (
                <div>No new items</div>
              ) : (
                <div>No search results for: {this.state.search}.</div>
              )}
            </div>
          )}
        {finalSize.length > 0 && (
          <div className="dl-item-group">
            <ListHeaderItem order={this.state.order} active={this.state.filter} />
            {finalSize.map((item, index) => (
              <ListItem key={item.id} active={this.state.filter} index={index} item={item} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({ dailyListings: state.stats.dailyListings });

const mapDispatch = dispatch => ({
  load: () => {
    dispatch(fetchDailyListings(1));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(NewListings);
