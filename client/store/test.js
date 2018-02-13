import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA';

/**
 * INITIAL STATE
 */
const defaultData = {
  state: 'init',
  data: [],
};

/**
 * ACTION CREATORS
 */
export const getData = data => ({ type: GET_DATA, data });

/**
 * THUNK CREATORS
 */
export const getTestData = () => dispatch =>
  axios
    .get('/api/torrents/listings')
    .then(res => dispatch(getData(res.data || defaultData)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultData, action) {
  switch (action.type) {
    case GET_DATA:
      return { state: 'loaded', data: action.data };
    default:
      return state;
  }
}
