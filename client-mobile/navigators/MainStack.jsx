import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen";
import LandingScreen from "../screen/landing";
import RegisterScreen from "../screen/register";
import DetailScreen from "../screen/DetailScreen";
import ProfileScreen from "../screen/ProfileScreen";
import { SafeAreaView } from "react-native";
import MyRides from "../screen/MyRides";
import PostRideScreen from "../screen/PostRideScreen";
import ChatScreen from "../screen/ChatScreen";
import RideRequestScreen from "../screen/RideRequestScreen";
import ChatBox from "../screen/ChatBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Payment from "../components/Payment";

const Stack = createNativeStackNavigator();

// const value =  await AsyncStorage.getItem("access_token");

export default function MainStack() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function getVerifiedStatus() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          console.log(token);
          setVerified(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getVerifiedStatus();
  }, []);
  console.log(verified);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyRides" component={MyRides} />
      <Stack.Screen name="PostRide" component={PostRideScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="RideRequest" component={RideRequestScreen} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
    // <Stack.Navigator initialRouteName="Home">
    //   {verified && (
    //     <>
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       <Stack.Screen name="Details" component={DetailScreen} />
    //       <Stack.Screen name="Profile" component={ProfileScreen} />
    //       <Stack.Screen name="MyRides" component={MyRides} />
    //       <Stack.Screen name="PostRide" component={PostRideScreen} />
    //       <Stack.Screen name="Chat" component={ChatScreen} />
    //       <Stack.Screen name="RideRequest" component={RideRequestScreen} />
    //       <Stack.Screen name="ChatBox" component={ChatBox} />
    //       <Stack.Screen name="Payment" component={Payment} />
    //     </>
    //   )}
    //   <Stack.Screen name="Landing" component={LandingScreen} />
    //   <Stack.Screen name="Login" component={LoginScreen} />
    //   <Stack.Screen name="Register" component={RegisterScreen} />
    // </Stack.Navigator>
  );
}
