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
  Entypo,
} from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";
import RatingModal from "./RatingModal";

const CardMyRides = ({ item }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const id = item.Ride.createdBy; // Replace with your ID
  const handleRatingSelected = (selectedRating) => {
    setRating(selectedRating);

  };

  const handlePayments = async () => {
    try {
      const { data } = await axios.post(
        BASE_URL + `/rides/generate-midtrans-token/${item.id}`,
        {},
        {
          headers: {
            access_token: await AsyncStorage.getItem("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      navigation.navigate("Payment", data);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <View className="flex-1 mt-1 items-center  ">
      <View className="flex-row mx-6 px-4 py-2 bg-background text-white shadow-3xl shadow-black-500/50 rounded-md mt-4 space-x-2">
        <View className="justify-center items-center text-center">
          <Octicons name="dot-fill" size={24} color="grey" />
          <View className="h-[85px] w-1 bg-slate-500"></View>
          <Octicons name="dot-fill" size={24} color="grey" />
        </View>

        <View className="flex-row w-full justify-between">
          <View>
            <View>
              <Text className="text-white text-lg">{item?.Ride.startLocation}</Text>
              <Text className="text-[11px] text-white">
                {item?.Ride.departureTime}
              </Text>
            </View>

            <View className="h-[70px] w-1"></View>
            <View>
              <Text className="text-white text-lg">{item?.Ride.destination}</Text>
              <Text className="text-[11px] text-white">
                {item?.Ride.arrivalTime}
              </Text>
            </View>
          </View>
          <View className="mr-1 items-center">
            <Text className="text-2xl font-bold text-white">
              {item?.Ride.price}
            </Text>
            <Text className="font-bold my-8 text-white">
              Seat : {item?.Ride.seats}
            </Text>
            {item?.status === "requested" ? (
              <TouchableOpacity
                className=" py-3 rounded-lg px-4  "
                onPress={handlePayments}
              >
                <Text className="text-center uppercase text-white text-[16px]">
                  {" "}
                  {item?.status}
                </Text>
              </TouchableOpacity>
            ) : item?.status === "paid" ? (
              <View className="flex-row  items-center justify-end">
                <TouchableOpacity
                  className="  rounded-lg px-5   "
                  onPress={handlePayments}
                >
                  <Text className="text-center uppercase text-white text-[16px]">
                    {" "}
                    {item?.status}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className=" py-3 rounded-lg "
                  onPress={() => setModalVisible(true)}
                >
                  <Entypo name="star-outlined" size={24} color="white" />
                </TouchableOpacity>
                <RatingModal
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onRatingSelected={handleRatingSelected}
                />
                
              </View>
            ) : (
              <TouchableOpacity
                className=" py-3 rounded-lg px-5 bg-sky-400  "
                onPress={handlePayments}
              >
                <Text className="text-center uppercase text-white text-[16px]">
                  {" "}
                  Unpaid{" "}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardMyRides;
