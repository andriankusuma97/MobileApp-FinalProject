import { BASE_URL, FETCH_NEWS } from "../action/actionType";

const initialState ={
  user:[]
};
const userReducer = (state = initialState, action)=>{
  console.log(action)
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: action.payload,
        
      };
    default:
      return state
  }
}
export default userReducer;