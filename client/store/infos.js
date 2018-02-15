import axios from 'axios';
import history from '../history';
import _ from 'lodash';

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
const ADD_INFOS = 'ADD_INFOS';
const UPDATE_INFOS = 'UPDATE_INFOS';

/**
 * ACTION CREATORS
 */
export const addInfos = infosArr => ({ type: ADD_INFOS, infosArr });
export const updateInfos = listingsToUpdateArr => ({
  type: UPDATE_INFOS,
  listingsToUpdateArr,
});

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFOS: {
      const newIds = [...state.currentIds];
      const newInfoArr = [...state.items];
      action.infosArr.forEach((info) => {
        if (newIds.indexOf(info.id) === -1) {
          newInfoArr.push(_.cloneDeep(info));
          newIds.push(info.id);
        }
      });
      return {
        ...state,
        items: newInfoArr,
        currentIds: newIds,
      };
    }
    case UPDATE_INFOS: {
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
