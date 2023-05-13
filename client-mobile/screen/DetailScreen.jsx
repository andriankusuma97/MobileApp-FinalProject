import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import {
  Octicons,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import SweetAlert from 'react-native-sweet-alert';
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";

const DetailScreen = () => {
  const [rides, setRides] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.item.id;
 
  const fetchDetailRide = async () => {
  
    const { data } = await axios.get(BASE_URL + `/rides/${id}`, {
      headers: {
        access_token: await AsyncStorage.getItem("access_token"),
      },
    });
    setRides(data);
  };

  const handleBookRide = async () => {
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
      Alert.alert('Booking Success');
      
      navigation.replace("MyRides");
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    fetchDetailRide();
  }, []);

  return (
    <View className="flex-1 bg-background">
      <View className="mx-6 my-4 mb-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Home");
          }}
        >
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mx-6 px-4 py-2 bg-slate-100 rounded-md">
        <View className="flex-row items-center space-x-4">
          <View className="bg-slate-600 w-16 h-16 rounded-full border border-slate-400 ">
            <Image
              className="w-full h-full object-cover rounded-full "
              source={{uri:rides?.UserRides[0].User.photo}}
            />
          </View>
          <View>
            <Text className="font-semibold text-2xl ">
              {rides?.UserRides[0].User.name}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row mt-10 mx-6 px-4 py-2 bg-slate-100 rounded-md items-center justify-between ">
        <View>
          <View className="flex-row space-x-1">
            <Text className=" text-sky-700 font-bold text-[16px]">
              {rides?.departureTime}
            </Text>
            <Octicons name="dot-fill" size={24} color="grey" />
            <Text className=" text-sky-700 font-bold  text-[16px]  ">
              {`Seats:${rides?.seats} `}
            </Text>
          </View>
        </View>
        <View>
          <FontAwesome5 name="car-side" size={24} color="black" />
        </View>
      </View>

      <View className="flex-row mx-6 px-4 py-2 bg-slate-100 rounded-md mt-4 space-x-2">
        <View className="justify-center items-center text-center">
          <Octicons name="dot-fill" size={24} color="grey" />
          <View className="h-[85px] w-1 bg-slate-500"></View>
          <Octicons name="dot-fill" size={24} color="grey" />
        </View>

        <View className="flex-row w-full justify-between">
          <View>
            <View>
              <Text className="text-xl font-semibold">{rides?.startLocation}</Text>
              <Text className="text-[14px]">{rides?.departureTime}</Text>
            </View>

            <View className="h-[40px] w-1"></View>
            <View>
              <Text className="text-xl font-semibold">{rides?.destination}</Text>
              <Text className="text-[14px]">{rides?.arrivalTime}</Text>
            </View>
          </View>
          <View className="mr-4">
            <Text className="text-2xl font-bold">{rides?.price}</Text>
          </View>
        </View>
      </View>

      <View className="mt-6 mx-6 px-4 py-4 bg-slate-100 rounded-md shadow-md">
        <Text className="text-lg font-semibold text-slate-600">
          Info Pengemudi dan Kendaraan
        </Text>
        <View className="flex-row items-center mt-2 space-x-2">
          <Ionicons name="md-car" size={24} color="grey" />
          <Text>{rides?.Vehicle ? rides.Vehicle.type : `Not Inputed`}</Text>
        </View>

        <View className="mt-2 flex-row space-x-2">
          <FontAwesome name="phone" size={24} color="grey" />
          <Text>{rides?.UserRides[0].User.phoneNumber}</Text>
        </View>
        <View className="flex-row items-center space-x-2 mt-2 pr-2 ">
          <AntDesign name="exclamationcircle" size={24} color="grey" />
          <Text>{rides?.UserRides[0].User.address}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatBox", { item: rides?.UserRides[0].User })
        }
      >
        <View className="flex-row mt-6 mx-6 px-4 py-4 bg-slate-100 rounded-md shadow-md space-x-2 items-center ">
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          <Text className="text-xl">Chat</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
       onPress={handleBookRide}
      >
        <View className=" bg-sky-400 mt-8 mx-6 px-4 py-4  rounded-2xl shadow-md space-x-2 items-center ">
          <Text className="text-3xl text-center">Book This Ride</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default DetailScreen;
