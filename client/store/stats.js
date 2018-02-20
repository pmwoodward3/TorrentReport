import axios from 'axios';
import history from '../history';
import { spreadListings } from './index';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  siteStats: {},
  topNewSnapshots: {
    state: 'init',
    items: [],
  },
  dailyListings: {},
  userCount: 0,
};

/**
 * ACTION TYPES
 */
const RECEIVE_TOP_NEW_SNAPSHOTS = 'RECEIVE_TOP_NEW_SNAPSHOTS';
const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
const RECEIVE_STATS = 'RECEIVE_STATS';
const RECEIVE_DAILY_LISTINGS = 'RECEIVE_DAILY_LISTINGS';
const SET_DAILY_LISTINGS = 'SET_DAILY_LISTINGS';

/**
 * ACTION CREATORS
 */
export const receiveTopNewSnapshots = snapshotsArr => ({
  type: RECEIVE_TOP_NEW_SNAPSHOTS,
  snapshotsArr,
});
export const setOnlineUsers = userCount => ({ type: SET_ONLINE_USERS, userCount });
export const receiveStats = siteStats => ({ type: RECEIVE_STATS, siteStats });
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
export const fetchTopNewSnapshots = (days = 1) => dispatch =>
  axios
    .get(`/api/torrents/snapshots/new/${days}`)
    .then(res => dispatch(receiveTopNewSnapshots(res.data)))
    .catch(err => console.log(err));

export const fetchStats = () => dispatch =>
  axios
    .get('/api/torrents/stats/')
    .then(res => dispatch(receiveStats(res.data)))
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
    case SET_ONLINE_USERS: {
      const { userCount } = action;
      return { ...state, userCount };
    }
    case RECEIVE_TOP_NEW_SNAPSHOTS:
      return { ...state, topNewSnapshots: { state: 'ready', items: action.snapshotsArr } };
    case RECEIVE_STATS:
      return { ...state, state: 'loaded', siteStats: action.siteStats };
    case RECEIVE_DAILY_LISTINGS: {
      const newDailyListings = { ...state.dailyListings };
      newDailyListings[`days${action.days}`] = action.dailyListings.map(listing => listing);
      // newDailyListings[`days${action.days}`] = action.dailyListings.map(listing => listing.id);
      return { ...state, dailyListings: newDailyListings };
    }
    default:
      return state;
  }
};
