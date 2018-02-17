import _ from 'lodash';
import store, {
  fetchInfoById,
  fetchListingById,
  fetchInfosById,
  fetchStats,
  fetchGroups,
  fetchSites,
} from '../store';

const getSiteByID = (siteId) => {
  if (!siteId) return false;
  const state = store.getState();
  const foundSite = _.find(state.sites.items, site => site.id === siteId);
  console.log('foundInf', foundSite);
  return foundSite || false;
};

const getOrFetchSiteByID = (siteId) => {
  if (!siteId) return false;
  const foundSite = getSiteByID(siteId);
  if (foundSite) return foundSite;
  // fetch groups we might need it for site only
  store.dispatch(fetchGroups());
  // store.dispatch(fetchSites());
  return false;
};

const getGroupByID = (groupId) => {
  if (!groupId) return false;
  const state = store.getState();
  const foundInfo = _.find(state.groups.items, group => group.id === groupId);
  return foundInfo || false;
};

const getOrFetchGroupByID = (groupId) => {
  if (!groupId) return false;
  const foundGroup = getGroupByID(groupId);
  if (foundGroup) return foundGroup;
  store.dispatch(fetchGroups());
  return false;
};

const getInfosByID = (infosIdArr) => {
  if (!infosIdArr) return false;
  const state = store.getState();
  const results = _.filter(state.infos.items, info => infosIdArr.indexOf(info.id) >= 0);
  return results && results.length === infosIdArr.length ? results : false;
};
const getListingsByID = (listingsIdArr) => {
  if (!listingsIdArr) return false;
  const state = store.getState();
  const results = state.listings.items.filter(listing => listingsIdArr.indexOf(listing.id) >= 0);
  return results && results.length === listingsIdArr.length ? results : false;
};
const getInfoByID = (infoId) => {
  if (!infoId) return false;
  const state = store.getState();
  const foundInfo = _.find(state.infos.items, info => info.id === infoId);
  return foundInfo || false;
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
  console.log('dispatching lising id!!!');
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
  getSiteByID,
  getOrFetchSiteByID,
  getGroupByID,
  getOrFetchGroupByID,
};
