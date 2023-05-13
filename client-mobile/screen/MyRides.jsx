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
import CardMyRides from "../components/CardMyRides";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";

const MyRides = () => {
  const navigation = useNavigation();
  const [rides, setRides] = useState([]);

  const fetchMyRides = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/users/rides", {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setRides(data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    fetchMyRides();
    navigation.setOptions({
      headerShown: false,
    });
  }, [rides]);

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
        <Text className="text-3xl">My Rides</Text>
      </View>

      <FlatList
        data={rides}
        renderItem={({ item }) => <CardMyRides item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MyRides;
