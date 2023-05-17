import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
} from "@expo/vector-icons";
import CardRequestRides from "../components/CardRequestRides"
import { useDispatch, useSelector } from "react-redux";
import { getRequestRides } from "../store/action/actionCreator";


const RideRequestScreen = () => {
  const navigation = useNavigation();
  // const [ride, setDataRequest] = useState({});
  const dispatch = useDispatch()

  const {requestRide,ridesLoading} = useSelector((state)=>{
    return state.ridesReducer
  })
  // console.log(ride,"<<<<ride dari request screen")

  const fetchRequetedRides = async () => {
    try {
      await dispatch(getRequestRides())
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    fetchRequetedRides()
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

 
  return (
    <View className="flex-1 bg-white">
        <View className="mx-6 my-4  ">
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Profile");
          }}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mt-4 mx-8">
        <Text className="text-3xl">Request Ride</Text>
      </View>

      <FlatList
        data={requestRide}
        renderItem={({ item }) => <CardRequestRides item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RideRequestScreen;


