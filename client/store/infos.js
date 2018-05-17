import axios from 'axios';
import _ from 'lodash';
import { spreadGroups } from './groups';

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
 * THUNK CREATORS
 */
export const spreadInfos = infosArr => (dispatch) => {
  if (!infosArr) return false;
  const Groups = [];
  infosArr.forEach((info) => {
    info.Group.forEach(groupItem => Groups.push(_.cloneDeep(groupItem)));
  });
  dispatch(addInfos(infosArr));
  return Groups.length ? dispatch(spreadGroups(Groups)) : false;
};

export const fetchInfoById = infoID => (dispatch) => {
  if (!infoID) return false;
  return axios.get(`/api/torrents/infos/${infoID}`).then((res) => {
    if (res.data === null) throw Error('null data');
    const infoArr = [];
    infoArr.push(res.data);
    dispatch(spreadInfos(infoArr));
  });
};

export const fetchInfosById = infoIds => (dispatch) => {
  if (!infoIds) return false;
  return axios.post('/api/torrents/infos/', { infoIds }).then((res) => {
    if (res.data === null) throw Error('null data');
    dispatch(spreadInfos(res.data));
  });
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFOS: {
      const newInfoObj = { ...state.items };
      action.infosArr.forEach((info) => {
        newInfoObj[info.id] = info;
      });
      return {
        ...state,
        items: newInfoObj,
      };
    }
    default:
      return state;
  }
};
