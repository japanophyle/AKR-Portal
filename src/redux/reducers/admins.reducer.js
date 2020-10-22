const admins = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMINS':
          return action.payload;
        case 'UNSET_USER':
          return [];
        default:
          return state;
    }
};
  
  export default admins;
  