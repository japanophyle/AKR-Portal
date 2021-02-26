import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import ranks from './ranks.reducer';
import info from './info.reducer';
import editInfo from './infoEdit.reducer'
import dojos from './dojos.reducer';
import members from './members.reducer';
import myDojo from './myDojo.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  ranks, // will have the ranks and dates for logged in user
  info, // will have the currently logged-in user's info
  dojos, // will have the dojo names, ids, and region ids
  members,
  editInfo, // for editing info on a sepecific user
  myDojo, // holds names and ranks of the current user's dojo
});

export default rootReducer;
