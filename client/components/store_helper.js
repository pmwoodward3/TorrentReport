import _ from 'lodash';
import store, { fetchInfoById, fetchListingById, fetchInfosById, fetchStats } from '../store';

const getInfosByID = (infosIdArr) => {
  if (!infosIdArr) return false;
  const state = store.getState();
  const results = _.filter(state.infos.items, info => infosIdArr.indexOf(info.id) >= 0);
  return results && results.length ? results : false;
};
const getListingsByID = (listingsIdArr) => {
  if (!listingsIdArr) return false;
  const state = store.getState();
  const results = state.listings.items.filter(listing => listingsIdArr.indexOf(listing.id) >= 0);
  return results && results.length ? results : false;
};
const getInfoByID = (infoId) => {
  if (!infoId) return false;
  const state = store.getState();
  const foundInfo = state.infos.currentIds.indexOf(infoId);
  if (foundInfo > -1) return state.infos.currentIds[foundInfo];
  return false;
};
const getListingByID = (listingId) => {
  if (!listingId) return false;
  const state = store.getState();
  const foundListing = _.find(state.listings.items, listing => listing.id === listingId);
  return foundListing || false;
};
const getOrFetchInfoByID = (infoId) => {
  if (!infoId) return false;
  const foundInfo = getInfoByID(infoId);
  if (foundInfo) return foundInfo;
  store.dispatch(fetchInfoById(infoId));
  return false;
};
const getOrFetchListingByID = (listingId) => {
  if (!listingId) return false;
  const foundListing = getListingByID(listingId);
  if (foundListing) return foundListing;
  store.dispatch(fetchListingById(listingId));
  return false;
};
const getOrFetchInfosByID = (infoIdArr) => {
  if (!infoIdArr) return false;
  const foundInfos = getInfosByID(infoIdArr);
  if (foundInfos && foundInfos.length) return foundInfos;
  store.dispatch(fetchInfosById(infoIdArr));
  return false;
};
const getOrFetchListingsByID = (listingIdArr) => {
  const foundListings = getListingsByID(listingIdArr);
  if (foundListings && foundListings.length) return foundListings;
  const state = store.getState();
  const neededListingIdArr = state.listings.currentIds.filter(listing => listingIdArr.indexOf(listing.id) === -1);
  store.dispatch(fetchListingById(neededListingIdArr));
  return false;
};

const getSiteStats = () => {
  const state = store.getState();
  if (_.has(state.stats, 'siteStats.id')) {
    return state.stats.siteStats;
  }
  return false;
};

const getOrFetchSiteStats = () => {
  const siteStats = getSiteStats();
  if (siteStats) return siteStats;
  console.log('dispatching fetch stats!!!!!');
  store.dispatch(fetchStats());
  return false;
};

module.exports = {
  getInfosByID,
  getListingsByID,
  getInfoByID,
  getListingByID,
  getOrFetchInfoByID,
  getOrFetchListingByID,
  getOrFetchInfosByID,
  getOrFetchListingsByID,
  getSiteStats,
  getOrFetchSiteStats,
};
