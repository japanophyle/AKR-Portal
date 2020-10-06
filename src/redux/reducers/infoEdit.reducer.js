const editInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT_USER_INFO':
      return action.payload;
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
