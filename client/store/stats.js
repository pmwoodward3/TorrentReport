import axios from 'axios';
import history from '../history';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  siteStats: {},
  dailyListings: [],
};

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS';
const GET_DAILY_LISTINGS = 'GET_DAILY_LISTINGS';

/**
 * ACTION CREATORS
 */
export const getStats = siteStats => ({ type: GET_STATS, siteStats });
export const getDailyListings = (dailyListings, days) => ({
  type: GET_DAILY_LISTINGS,
  dailyListings,
  days,
});

/**
 * THUNK CREATORS
 */
export const fetchStats = () => dispatch =>
  axios
    .get('/api/torrents/stats/')
    .then(res => dispatch(getStats(res.data || [defaultData])))
    .catch(err => console.log(err));

// gets daily listinsg
export const fetchDailyListings = days => dispatch =>
  axios
    .get(`/api/torrents/listings/new/${days}`)
    .then(res => dispatch(getDailyListings(res.data || defaultData)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_STATS:
      return { ...state, state: 'loaded', siteStats: action.siteStats };
    case GET_DAILY_LISTINGS:
      return { ...state, dailyListings: action.dailyListings };
    default:
      return state;
  }
};
