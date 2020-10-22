import { combineReducers } from 'redux';

const activeMembersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_USERS':
      return action.payload;
    default:
      return state;
  }
};

const inactiveMembersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_INACTIVE_USERS':
      return action.payload;
    default:
      return state;
  }
};

// members will be on the redux state at:
// state.members
export default combineReducers({
  activeMembersReducer,
  inactiveMembersReducer
});
