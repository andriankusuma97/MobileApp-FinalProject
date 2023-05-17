import { BASE_URL, LOGIN_USER } from "../action/actionType";

const initialState ={
  loginSuccess:""
};
const loginReducer = (state = initialState, action)=>{
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
        
      };
    default:
      return state
  }
}
export default loginReducer;