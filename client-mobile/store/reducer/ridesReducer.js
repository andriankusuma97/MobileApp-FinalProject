import { RIDES_LOADING, GET_RIDES,GET_DETAIL_RIDE,GET_REQUEST_RIDE,GET_MY_RIDE} from "../action/actionType";

const initialState = {
  rides: [],
  ridesLoading:true,
  detailsRide:{},
  requestRide:[],
  myRides:[],
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

    case GET_DETAIL_RIDE:
      return { 
        ...state,
        detailsRide: action.payload 
        };
    
    case GET_REQUEST_RIDE:
      return{
        ...state,
        requestRide: action.payload 
      }

    case GET_MY_RIDE:
      return{
        ...state,
        myRides: action.payload 
      }

    default:
      return state;
  }
};

export default ridesReducer;