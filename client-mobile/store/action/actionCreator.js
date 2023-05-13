import { BASE_URL, FETCH_RIDES,FETCH_DETAIL_RIDE,LOGIN_USER,ADD_USER } from "./actionType";
import axios from 'axios';
import Swal from 'sweetalert2'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export function  fetchRideSuccess (payload) {
  return {
    type: FETCH_RIDES,
    payload,
  }
}
export function  fetchDetailRideSuccess (payload) {
  return {
    type: FETCH_DETAIL_RIDE,
    payload,
  }
}

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});

export const setRides = (rides) => ({
  type: 'SET_RIDES',
  payload: rides,
});




export function fetchDataRides() {

  return async (dispatch,getState)=>{
    try {
      const {data} = await axios.get(BASE_URL + "/rides");
     
      console.log(data,"><<<<<<<dari action")
      dispatch(fetchRideSuccess(data))
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }
}

export function fetchDetailPost(id) {

  return async (dispatch,getState)=>{

    try {
      const {data} = await fetch(BASE_URL + "/post/"+id);
     
      dispatch(fetchDetailPostSuccess(data))
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }
}

export function handleLogin(user) {
  return async(dispatch,getState)=>{
    try {
      const { data } = await axios.post(BASE_URL + '/users/login', user);
      await AsyncStorage.setItem('access_token', data.access_token);
      dispatch(loginSuccess(data));
    } catch (error) {
      // show error message to user
    }
  }
}

export function handleRegister(user){
  return async(dispatch,getState)=>{
    try {
      console.log(user,"<<<<<dari action")
      let data = await axios.post (BASE_URL + '/users/register',user)
      // Swal.fire("Good job!", "Success Register!", "success");
      dispatch(registerSuccess(data))
    } catch (error) {
      console.log(error)
      Swal.fire("Cancelled", `${error.response.data.message}`, "error");
    }

  }
}


export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(BASE_URL + '/users/currentUser', {
      headers: { access_token: await AsyncStorage.getItem('access_token') },
    });
    dispatch(setCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRides = () => async (dispatch) => {
  const { data } = await axios.get(BASE_URL + '/rides', {
    headers: { access_token: await AsyncStorage.getItem('access_token') },
  });
  dispatch(setRides(data));
};