import store from '../store';
import _ from 'lodash';

const getInfosByID = (infosIdArr) => {
  const state = store.getState();
  const results = _.filter(state.infos.items, info => infosIdArr.indexOf(info.id) >= 0);
  return results;
};
const getListingsByID = (listingsIdArr) => {
  const state = store.getState();
  const results = _.filter(state.listings.items, listing => listingsIdArr.indexOf(listing.id) >= 0);
  return results;
};

module.exports = { getInfosByID, getListingsByID };
