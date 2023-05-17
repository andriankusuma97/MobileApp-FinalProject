import {
   BASE_URL, 
   RIDES_LOADING,
   LOGIN_USER,
   ADD_USER,
   GET_RIDES,
   GET_DETAIL_RIDE,
   GET_REQUEST_RIDE,
   GET_MY_RIDE
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
    type: GET_DETAIL_RIDE,
    payload,
  }
}
export function  fetchRequestRideSuccess (payload) {
  return {
    type: GET_REQUEST_RIDE,
    payload,
  }
}
export function  fetchMyRideSuccess (payload) {
  return {
    type: GET_MY_RIDE,
    payload,
  }
}


// ACTION AXIOS SERVER
export function handleLogin(user) {
  return async(dispatch,getState)=>{
    try {
      const { data } = await axios.post(BASE_URL + "/users/login", user);
      await AsyncStorage.setItem("access_token", data.access_token);
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
      // console.log(data,"<<<ini dari data user di action")
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

export function fetchDetailsRide(id) {
  return async (dispatch,getState)=>{
    try {
      // console.log(id,"<<<< masuk action")
      const { data } = await axios.get(BASE_URL + `/rides/${id}`, {
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
        },
      });
      // console.log(data,"<<<<< data dari action")
      dispatch(fetchDetailRideSuccess(data))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
};

export function getStatusBookRide(id) {
  return async (dispatch,getState)=>{
    try {
      const { data } = await axios.post(
              BASE_URL + `/rides/order/${id}`,{},
              {
                headers: {
                  "access_token": await AsyncStorage.getItem("access_token"),
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
      // await dispatch(fetchDetailRideSuccess(data))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
};

export function addNewRide(newRide){
  return async (dispatch,getState)=>{
    try {
       console.log(newRide, "<<<<< data add ne action");
       const access_token = await AsyncStorage.getItem("access_token");
       const res = await axios.post(BASE_URL + "/rides", newRide, {
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           access_token: access_token,
         },
       });
       console.log("<<<< masuk kesini action")
       console.log(res)
       console.log("Uploaded");
    } catch (error) {
      throw error

    }
  }
}

export function getRequestRides(){
  return async (dispatch,getState)=>{
    try {
      const { data } = await axios.get(BASE_URL + "/rides/requests", {
        headers: { access_token: await access_token},
      });
      dispatch(fetchRequestRideSuccess(data))
    } catch (error) {
      throw error
    }
  }
}
export function getMyRides(){
  return async (dispatch,getState)=>{
    try {
      const { data } = await axios.get(BASE_URL + "/users/rides", {
        headers: { access_token: await access_token },
      });
      dispatch(fetchMyRideSuccess(data))
    } catch (error) {
      throw error
    }
  }
}