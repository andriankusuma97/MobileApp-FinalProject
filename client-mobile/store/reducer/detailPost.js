
import { BASE_URL, FETCH_NEWS,FETCH_DETAIL_NEWS } from "../action/actionType";

const initialState ={
  detailPost:[]
};
const detailPostReducer = (state = initialState, action)=>{
  console.log(action)
  switch (action.type) {
    case FETCH_DETAIL_NEWS:
      return {
        ...state,
        detailNews: action.payload,
        
      };
    default:
      return state
  }
}
export default detailPostReducer;