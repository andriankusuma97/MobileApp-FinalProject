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
import { useNavigation } from "@react-navigation/native";
import {
  Octicons,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import React, { useEffect } from "react";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";

const CardRequestRides = ({ item }) => {
  const navigation = useNavigation();
  console.log(item,"<<<< dari card requsted ride")
  const handleAccept = async () => {
    try {
      const { data } = await axios.patch(
        BASE_URL + `/rides/order/${item.id}`,{status:"unpaid"},
        {
          headers: {
            "access_token": await AsyncStorage.getItem("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      navigation.replace('RideRequest')
      console.log(data);//alert succes untuk pergantian status
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const { data } = await axios.patch(
        BASE_URL + `/rides/order/${item.id}`,{status:"rejected"},
        {
          headers: {
            "access_token": await AsyncStorage.getItem("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      navigation.replace('RideRequest')
      console.log(data);//alert succes untuk pergantian status
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 mt-3 items-center  ">
      <View className="mx-6 px-4 py-2 bg-background w-10/12 text-white shadow-3xl shadow-black-500/50 rounded-md mt-4 space-x-2">
        <View className="flex-row  "> 
        <View className="flex-row space-x-3  w-full justify-between">
          <View className="flex-row space-x-3">
              <View className="bg-slate-600 w-16 h-16 rounded-full border border-slate-400 ">
                <Image
                  className="w-full h-full object-cover rounded-full "
                  source={{ uri: item?.User.photo }}
                />
              </View>
              <View className="justify-center items-start text-center">
                <Text className="text-white text-xl">{item?.User.name}</Text>
              </View>
          </View>
            <View>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ChatBox",{item:item.User});
            }}>
              <Ionicons name="chatbox-ellipses-outline" size={30} color="white" />
            </TouchableOpacity>
            </View>
        </View>

        <View>
          <Text></Text>
        </View>
        </View>

        
        <View className="flex-row justify-between mt-2">
          <View>
          <Text className="text-white"> Ratings </Text> 
          <Text className="text-white"> 4,5/5 </Text> 

          </View>

          <View className="flex-row space-x-2">
          <TouchableOpacity
          className=" py-3 rounded-lg px-2 bg-sky-400 "
            onPress={handleAccept}
          >
               <Text className="text-center text-white text-[16px]">Accept</Text>
          </TouchableOpacity>



          
          <TouchableOpacity
          className=" py-3 rounded-lg px-3 bg-red-400 "
          onPress={handleReject}
          >
               <Text className="text-center  text-white text-[16px]">Reject</Text>
          </TouchableOpacity>
          </View>
          
        </View>

        </View>
    </View>
  );
};

export default CardRequestRides;
