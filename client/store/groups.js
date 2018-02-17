import axios from 'axios';
import history from '../history';
import _ from 'lodash';
import { addSites } from './sites';

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
const ADD_GROUPS = 'ADD_GROUPS';
const UPDATE_GROUPS = 'UPDATE_GROUPS';

/**
 * ACTION CREATORS
 */
export const addGroups = groupsArr => ({ type: ADD_GROUPS, groupsArr });
export const updateGroups = groupsToUpdate => ({
  type: UPDATE_GROUPS,
  groupsToUpdate,
});

/**
 * THUNK CREATORS
 */
export const spreadGroups = groupsArr => (dispatch) => {
  if (!groupsArr) return false;
  const Sites = [];
  groupsArr.forEach((Group) => {
    Sites.push(Group.torrentSite);
  });

  dispatch(addGroups(groupsArr));
  if (Sites.length) dispatch(addSites(Sites));
};

export const fetchGroups = () => (dispatch) => {
  axios.get('/api/torrents/groups/').then((res) => {
    if (res.data === null) throw Error('null data');
    dispatch(spreadGroups(res.data));
  });
};

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUPS: {
      const newIds = [...state.currentIds];
      const newGroupArr = [...state.items];
      action.groupsArr.forEach((info) => {
        if (newIds.indexOf(info.id) === -1) {
          newGroupArr.push(_.cloneDeep(info));
          newIds.push(info.id);
        }
      });
      return {
        ...state,
        items: newGroupArr,
        currentIds: newIds,
      };
    }
    case UPDATE_GROUPS: {
      const updateIdsArr = action.groupsToUpdate.map(group => group.id);
      const removedNewInfos = _.filter(
        state.items,
        listing => updateIdsArr.indexOf(listing.id) >= 0,
      );
      const newGroupArr = removedNewInfos.concat(action.groupsToUpdate);
      const newCurrentIds = [...updateIdsArr];
      return {
        ...state,
        items: newGroupArr,
        currentIds: newCurrentIds,
      };
    }
    default:
      return state;
  }
};
