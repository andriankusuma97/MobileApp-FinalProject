import {
   BASE_URL, 
   RIDES_LOADING,
   LOGIN_USER,
   ADD_USER,
   GET_RIDES,
   FETCH_DETAIL_RIDE,
   } from "./actionType";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const access_token = AsyncStorage.getItem("access_token");

//REDUCER
export function loginSuccess(payload){
  return{
    type: LOGIN_USER,
    payload
  }
}

export function registerSuccess(payload){
  return{
    type: ADD_USER,
    payload
  }
}
export function getUserSuccess(payload){
  return{
    type: ADD_USER,
    payload
  }
}

export function  fetchRideSuccess (payload) {
  return {
    type: GET_RIDES,
    payload,
  }
}
export function  ridesLoading (payload) {
  return {
    type: RIDES_LOADING,
    payload,
  }
}
export function  fetchDetailRideSuccess (payload) {
  return {
    type: FETCH_DETAIL_RIDE,
    payload,
  }
}

// ACTION AXIOS SERVER
export function handleLogin(user) {
  return async(dispatch,getState)=>{
    try {
      const { data } = await axios.post(BASE_URL + "/users/login", user);
      // console.log("<<<< dari login masuk")
      await AsyncStorage.setItem("access_token", data.access_token);
      // console.log(access_token,data,"<<<<< dari login ")
      dispatch(loginSuccess())
    } catch (error) {
      console.log(error);
      throw error
    }
  }
 
};

export function handleRegister(user){
  return async(dispatch,getState)=>{
    try {
      console.log(user,"<<<<<dari action")
      let data = await axios.post (BASE_URL + '/users/register',user)
      // Swal.fire("Good job!", "Success Register!", "success");
      dispatch(registerSuccess(data))
    } catch (error) {
      console.log(error)

    }

  }
}

export function fetchCurrentUser() {
  return async (dispatch,getState)=>{
    try {
      const { data } = await axios.get(BASE_URL + "/users/currentUser", {
        headers: { access_token: await access_token },
      });
      dispatch(getUserSuccess(data))
    } catch (error) {
      console.log(error);
    }
  }
 
};


export function fetchDataRides(origin="",destination="") {

  return async (dispatch,getState)=>{
    try {
      // console.log(origin,"<<<<originnnnn")
      const { data } = await axios.get(BASE_URL + `/rides?origin=${origin}&dest=${destination}`, {
        headers: { access_token: await access_token },
      });
      dispatch(fetchRideSuccess(data))
      dispatch(ridesLoading(false))
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }
}


export const fetchRides = () => async (dispatch) => {
  const { data } = await axios.get(BASE_URL + '/rides', {
    headers: { access_token: await AsyncStorage.getItem('access_token') },
  });
  dispatch(setRides(data));
};