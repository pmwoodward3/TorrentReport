import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
export const setError = errorMessage => ({ type: SET_ERROR, errorMessage });
export const clearError = () => ({ type: CLEAR_ERROR });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err));

export const auth = (email, password, method) => (dispatch) => {
  if (!email.includes('@') || !email.includes('.')) {
    return dispatch(setError('your email does not look valid'));
  }
  if (!method) return dispatch(setError('need a method'));
  if (!email || email.length <= 8) {
    return dispatch(setError('email needs to be atleast 8 charecters long.'));
  }
  if (!password || password.length <= 2) {
    return dispatch(setError('password needs to be longer.'));
  }
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      (res) => {
        dispatch(getUser(res.data));
        history.push('/account');
      },
      (authError) => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      },
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
};

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then((_) => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case SET_ERROR: {
      const newUserObj = { ...state };
      newUserObj.error = {
        response: {
          data: action.errorMessage,
        },
      };
      return newUserObj;
    }
    case CLEAR_ERROR: {
      const newUserObj = { ...state };
      delete newUserObj.error;
      return newUserObj;
    }
    default:
      return state;
  }
}
