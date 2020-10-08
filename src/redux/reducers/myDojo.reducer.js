const myDojoReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MY_DOJO':
        return action.payload;
      default:
        return state;
    }
  };

  // myDojo will be on the redux state at:
  // state.myDojo
export default myDojoReducer;
  