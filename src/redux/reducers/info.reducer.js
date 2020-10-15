const infoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return action.payload;
      case 'LOGOUT':
        return {};
      default:
        return state;
    }
  };
  
  // info will be on the redux state at:
  // state.info
  export default infoReducer;
  