const ranks = (state = [], action) => {
    switch (action.type) {
        case 'SET_RANKS':
          return action.payload;
        case 'UNSET_USER':
          return [];
        default:
          return state;
    }
};
  
  export default ranks;
  