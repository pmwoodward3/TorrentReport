import _ from 'lodash';
import store, {
  fetchInfoById,
  fetchListingById,
  fetchInfosById,
  fetchStats,
  fetchGroups,
} from '../store';

const getNeededIds = (idArr, target) => idArr.filter(id => target[id] > 0);

const getSiteByID = (siteId) => {
  if (!siteId) return false;
  const state = store.getState();
  const { items } = state.sites;
  return items[siteId] || false;
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
  const { items } = state.groups;
  return items[groupId] || false;
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
  const { items } = state.infos;
  const results = [];
  infosIdArr.forEach((id) => { // eslint-disable-line consistent-return
    if (items[id]) results.push(items[id]);
    else return false;
  });
  return results && results.length === infosIdArr.length ? results : false;
};
const getListingsByID = (listingsIdArr) => {
  if (!listingsIdArr) return false;
  const state = store.getState();
  const { items } = state.listings;
  const results = [];
  listingsIdArr.forEach((id) => { // eslint-disable-line consistent-return
    if (items[id]) results.push(items[id]);
    else return false;
  });
  return results && results.length === listingsIdArr.length ? results : false;
};
const getInfoByID = (infoId) => {
  if (!infoId) return false;
  const state = store.getState();
  const { items } = state.infos;
  const foundInfo = items[infoId];
  return foundInfo || false;
};
const getListingByID = (listingId) => {
  if (!listingId) return false;
  const state = store.getState();
  const listings = state.listings.items;
  const foundListing = listings[listingId];
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
  if (foundInfos && foundInfos.length === infoIdArr.length) return foundInfos;
  const state = store.getState();
  const neededInfoIdArr = getNeededIds(infoIdArr, state.infos.items);
  store.dispatch(fetchInfosById(neededInfoIdArr));
  return false;
};
const getOrFetchListingsByID = (listingIdArr) => {
  const foundListings = getListingsByID(listingIdArr);
  if (foundListings && foundListings.length === listingIdArr.length) return foundListings;
  const state = store.getState();
  const neededListingIdArr = getNeededIds(listingIdArr, state.listings.items);
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
