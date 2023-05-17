import { BASE_URL, ADD_USER } from "../action/actionType";

const initialState ={
  user:[],
  userLoading: true

};
const userReducer = (state = initialState, action)=>{
  // console.log(action)
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
        
      };
    default:
      return state
  }
}
export default userReducer;