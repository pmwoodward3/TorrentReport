import axios from 'axios';
import { addSitesToTopFilter } from './topFilter';

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
    dispatch(addSitesToTopFilter(res.data));
    dispatch(addSites(res.data));
  });
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITES: {
      const newSiteObj = { ...state.items };
      action.sitesArr.forEach((site) => {
        newSiteObj[site.id] = site;
      });
      return {
        ...state,
        items: newSiteObj,
      };
    }

    default:
      return state;
  }
};
