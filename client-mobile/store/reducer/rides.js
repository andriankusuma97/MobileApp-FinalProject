const initialState = {
  currentUser: {},
  rides: [],
};

const ridesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_RIDES':
      return { ...state, rides: action.payload };
    default:
      return state;
  }
};

export default ridesReducer;