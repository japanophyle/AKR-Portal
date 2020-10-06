const editInfoReducer = (state = {}, action) => {
  switch (action.type) {
    // sets reducer for editing purposes
    case 'SET_EDIT_USER_INFO':
      return action.payload;
      // this handles all the changes to the reducer when edits are done 
      // in the user info page
    case 'SET_EDIT':
      console.log(action.payload.key, action.payload.value)
      // change the given property to the given value 
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

// info will be on the redux state at:
// state.info
export default editInfoReducer;
