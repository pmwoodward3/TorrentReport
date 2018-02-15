import axios from 'axios';
import history from '../history';
import _ from 'lodash';
import { addInfos } from './index';

/**
 * INITIAL STATE
 */
const initialState = {
  state: 'init',
  items: [],
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
  const infosArr = [];
  listings.forEach((listing) => {
    listing.Infos.forEach(info => infosArr.push(info));
  });
  const onlyListingsArr = listings.map(listing => _.clone(listing));
  dispatch(addListings(onlyListingsArr));
  if (infosArr.length) dispatch(addInfos(infosArr));
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
          newListingArr.push(_.cloneDeep(listing));
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
