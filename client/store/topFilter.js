/**
 * INITIAL STATE
 */
const initialState = {
  showingSites: {},
  showingGroups: {},
};

/**
 * ACTION TYPES
 */
const ADD_SITES_TO_TOP_FILTER = 'ADD_SITES_TO_TOP_FILTER';
const ADD_GROUPS_TO_TOP_FILTER = 'ADD_GROUPS_TO_TOP_FILTER';
const TOGGLE_SITE_TOP_FILTER = 'TOGGLE_SITE_TOP_FILTER';
const TOGGLE_GROUP_TOP_FILTER = 'TOGGLE_GROUP_TOP_FILTER';
const ENABLE_ALL_SITES_TOP_FILTER = 'ENABLE_ALL_SITES_TOP_FILTER';
const ENABLE_ALL_GROUPS_TOP_FILTER = 'ENABLE_ALL_GROUPS_TOP_FILTER';

/**
 * ACTION CREATORS
 */
export const addSitesToTopFilter = sitesArr => ({ type: ADD_SITES_TO_TOP_FILTER, sitesArr });
export const addGroupsToTopFilter = groupsArr => ({ type: ADD_GROUPS_TO_TOP_FILTER, groupsArr });
export const toggleSiteTopFilter = siteId => ({
  type: TOGGLE_SITE_TOP_FILTER,
  siteId,
});
export const toggleGroupTopFilter = groupName => ({
  type: TOGGLE_GROUP_TOP_FILTER,
  groupName,
});
export const enableAllSitesTopFilter = () => ({
  type: ENABLE_ALL_SITES_TOP_FILTER,
});
export const enableAllGroupsTopFilter = () => ({
  type: ENABLE_ALL_GROUPS_TOP_FILTER,
});

/**
 * THUNK CREATORS
 */

// export const fetchSites = () => (dispatch) => {
//   axios.get('/api/torrents/sites/').then((res) => {
//     if (res.data === null) throw Error('null data');
//     dispatch(addSites(res.data));
//   });
// };

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SITES_TO_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      action.sitesArr.forEach((site) => {
        newShowingSites[site.id] = true;
      });
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case TOGGLE_SITE_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      const currValue = newShowingSites[action.siteId];
      newShowingSites[action.siteId] = !currValue;
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case ADD_GROUPS_TO_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      action.groupsArr.forEach((group) => {
        newShowingGroups[group.name] = true;
      });
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }
    case TOGGLE_GROUP_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      const currValue = newShowingGroups[action.groupName];
      newShowingGroups[action.groupName] = !currValue;
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }
    case ENABLE_ALL_SITES_TOP_FILTER: {
      const newShowingSites = { ...state.showingSites };
      const siteIdsArr = Object.keys(newShowingSites);
      siteIdsArr.forEach((siteId) => {
        newShowingSites[siteId] = true;
      });
      return {
        ...state,
        showingSites: newShowingSites,
      };
    }
    case ENABLE_ALL_GROUPS_TOP_FILTER: {
      const newShowingGroups = { ...state.showingGroups };
      const groupNamesArr = Object.keys(newShowingGroups);
      groupNamesArr.forEach((groupName) => {
        newShowingGroups[groupName] = true;
      });
      return {
        ...state,
        showingGroups: newShowingGroups,
      };
    }

    default:
      return state;
  }
};
