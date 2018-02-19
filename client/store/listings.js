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
      const newListingObj = {
        ...state.items,
      };
      action.listingsArr.forEach((listing) => {
        newListingObj[listing.id] = listing;
      });
      return {
        ...state,
        items: newListingObj,
      };
    }
    default:
      return state;
  }
};
