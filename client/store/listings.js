import axios from 'axios';
import history from '../history';
import _ from 'lodash';
import { spreadInfos } from './index';

/**
 * INITIAL STATE
 */
const initialState = {
  state: 'init',
  items: {},
  currentIds: [],
};

/**
 * ACTION TYPES
 */
const ADD_LISTINGS = 'ADD_LISTINGS';
const UPDATE_LISTINGS = 'UPDATE_LISTINGS';

/**
 * ACTION CREATORS
 */
export const addListings = listingsArr => ({ type: ADD_LISTINGS, listingsArr });
export const updateListings = listingsToUpdateArr => ({
  type: UPDATE_LISTINGS,
  listingsToUpdateArr,
});

/**
 * THUNK CREATORS
 */

export const spreadListings = listings => (dispatch) => {
  if (!listings) return false;
  const infosArr = [];
  listings.forEach((listing) => {
    listing.Infos.forEach(info => infosArr.push(info));
  });
  dispatch(addListings(listings));
  if (infosArr.length) dispatch(spreadInfos(infosArr));
};

export const fetchListingById = infoID => (dispatch) => {
  axios.get(`/api/torrents/listings/${infoID}`).then((res) => {
    if (res.data === null) throw Error('null data');
    const infoArr = [];
    infoArr.push(res.data);
    dispatch(spreadListings(infoArr));
  });
};
export const fetchListingsById = listingIds => (dispatch) => {
  axios.post('/api/torrents/listings/', { listingIds }).then((res) => {
    if (res.data === null) throw Error('null data');
    const infoArr = [];
    infoArr.push(res.data);
    dispatch(spreadListings(infoArr));
  });
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LISTINGS: {
      const newIds = [...state.currentIds];
      const newListingArr = [...state.items];
      action.listingsArr.forEach((listing) => {
        if (newIds.indexOf(listing.id) === -1) {
          const newListing = { ...listing };
          newListing.infoIds = listing.Infos.map(info => info.id);
          newListingArr.push(_.omit(newListing, 'Infos'));
          newIds.push(listing.id);
        }
      });
      return {
        ...state,
        items: newListingArr,
        currentIds: newIds,
      };
    }
    case UPDATE_LISTINGS: {
      const updateIdsArr = action.listingsToUpdateArr.map(listing => listing.id);
      const removedNewListings = _.filter(
        state.items,
        listing => updateIdsArr.indexOf(listing.id) >= 0,
      );
      const newListingArr = removedNewListings.concat(action.listingsToUpdateArr);
      const newCurrentIds = [...state.currentIds, updateIdsArr];
      return {
        ...state,
        items: newListingArr,
        currentIds: newCurrentIds,
      };
    }
    default:
      return state;
  }
};
