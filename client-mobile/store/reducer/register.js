import { BASE_URL, ADD_USER } from "../action/actionType";

const initialState ={
  createSuccess:""
};
const registerReducer = (state = initialState, action)=>{
  // console.log(action)
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        createSuccess: action.payload,
        
      };
    default:
      return state
  }
}
export default registerReducer;