import axios from 'axios';
import history from '../history';
import { spreadListings } from './index';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  siteStats: {},
  dailyListings: {},
};

/**
 * ACTION TYPES
 */
const GET_STATS = 'GET_STATS';
const RECEIVE_DAILY_LISTINGS = 'RECEIVE_DAILY_LISTINGS';
const SET_DAILY_LISTINGS = 'SET_DAILY_LISTINGS';

/**
 * ACTION CREATORS
 */
export const getStats = siteStats => ({ type: GET_STATS, siteStats });
export const recieveDailyListings = (dailyListings, days) => ({
  type: RECEIVE_DAILY_LISTINGS,
  dailyListings,
  days,
});
export const setDailyListings = (dailyListings, days) => ({
  type: SET_DAILY_LISTINGS,
  dailyListings,
  days,
});

/**
 * THUNK CREATORS
 */
export const fetchStats = () => dispatch =>
  axios
    .get('/api/torrents/stats/')
    .then(res => dispatch(getStats(res.data)))
    .catch(err => console.log(err));

// gets daily listinsg
export const fetchDailyListings = days => dispatch =>
  axios
    .get(`/api/torrents/listings/new/${days}`)
    .then((res) => {
      dispatch(spreadListings(res.data));
      dispatch(recieveDailyListings(res.data, 1));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default (state = defaultData, action) => {
  switch (action.type) {
    case GET_STATS:
      return { ...state, state: 'loaded', siteStats: action.siteStats };
    case RECEIVE_DAILY_LISTINGS: {
      const newDailyListings = { ...state.dailyListings };
      newDailyListings[`days${action.days}`] = action.dailyListings.map(listing => listing.id);
      return { ...state, dailyListings: newDailyListings };
    }
    default:
      return state;
  }
};
