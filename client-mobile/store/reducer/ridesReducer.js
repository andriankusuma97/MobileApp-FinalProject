import { RIDES_LOADING, GET_RIDES } from "../action/actionType";

const initialState = {
  rides: [],
  ridesLoading:true
};

const ridesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RIDES:
      return { 
        ...state, 
        rides: action.payload 
      };

    case RIDES_LOADING:
      return { 
        ...state,
        redesLoading: action.payload 
        };

    default:
      return state;
  }
};

export default ridesReducer;