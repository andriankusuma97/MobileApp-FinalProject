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
  Octicons,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import CardRequestRides from "../components/CardRequestRides"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";


const RideRequestScreen = () => {
  const navigation = useNavigation();
  const [ride, setDataRequest] = useState({});

  // console.log(ride,"<<<<ride dari request screen")

  const fetchRequetedRides = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/rides/requests", {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      // console.log(data, "<<<< ini data dari requst");
      setDataRequest(data);
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
        data={ride}
        renderItem={({ item }) => <CardRequestRides item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RideRequestScreen;


