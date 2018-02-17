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
const ADD_SITES = 'ADD_SITES';
const UPDATE_SITES = 'UPDATE_SITES';

/**
 * ACTION CREATORS
 */
export const addSites = sitesArr => ({ type: ADD_SITES, sitesArr });
export const updateSites = sitesToUpdate => ({
  type: UPDATE_SITES,
  sitesToUpdate,
});

/**
 * THUNK CREATORS
 */

export const fetchSites = () => (dispatch) => {
  axios.get('/api/torrents/sites/').then((res) => {
    if (res.data === null) throw Error('null data');
    dispatch(addSites(res.data));
  });
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITES: {
      const newIds = [...state.currentIds];
      const newSiteArr = [...state.items];
      action.sitesArr.forEach((site) => {
        if (newIds.indexOf(site.id) === -1) {
          newSiteArr.push(site);
          newIds.push(site.id);
        }
      });
      return {
        ...state,
        items: newSiteArr,
        currentIds: newIds,
      };
    }
    case UPDATE_SITES: {
      const updateIdsArr = action.sitesToUpdate.map(group => group.id);
      const removedNewInfos = _.filter(
        state.items,
        listing => updateIdsArr.indexOf(listing.id) >= 0,
      );
      const newSiteArr = removedNewInfos.concat(action.sitesToUpdate);
      const newCurrentIds = [...updateIdsArr];
      return {
        ...state,
        items: newSiteArr,
        currentIds: newCurrentIds,
      };
    }
    default:
      return state;
  }
};
