import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  siteStats: {},
};

/**
 * ACTION CREATORS
 */
export const getStats = siteStats => ({ type: GET_STATS, siteStats });

/**
 * THUNK CREATORS
 */
export const fetchStats = () => dispatch =>
  axios
    .get('/api/torrents/stats/')
    .then(res => dispatch(getStats(res.data || defaultData)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_STATS:
      return { state: 'loaded', siteStats: action.siteStats };
    default:
      return state;
  }
};
