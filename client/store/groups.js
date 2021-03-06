import axios from 'axios';
import { addSites } from './sites';
import { addSitesToTopFilter, addGroupsToTopFilter } from './topFilter';

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
  dispatch(addGroupsToTopFilter(groupsArr));
  if (Sites.length) {
    dispatch(addSites(Sites));
    dispatch(addSitesToTopFilter(Sites));
  }
  return true;
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
      const newGroupObj = { ...state.items };
      action.groupsArr.forEach((group) => {
        newGroupObj[group.id] = group;
      });
      return {
        ...state,
        items: newGroupObj,
      };
    }
    default:
      return state;
  }
};
