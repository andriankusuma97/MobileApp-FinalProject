import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAddVihecle from "../components/ModalAddVihecle";
import axios from "axios";
const BASE_URL = "http://192.168.100.167:4002";


const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [user, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/users/currentUser", {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      let access_token = await AsyncStorage.getItem("access_token");
      navigation.replace("Landing");
    } catch (error) {
      console.log(error);
    }
  }

  const changeModalVisible = (bol) => {
    setModalVisible(bol);
  };

  useLayoutEffect(() => {
    fetchCurrentUser();
    navigation.setOptions({
      headerShown: false,
    });
  }, [user]);
  return (
    <View className="relative w-full max-w-2xl h-full  bg-white">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          changeModalVisible(false);
        }}
      >
        <ModalAddVihecle changeModalVisible={changeModalVisible} />
      </Modal>
      <View className="mx-6 my-2">
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Home");
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row mx-8 my-6 items-center">
        <View className="w-24 h-24 bg-slate-600 rounded-full border border-slate-600 ">
          <Image
            className="w-full h-full object-cover rounded-full "
            source={{ uri: user?.photo }}
          />
        </View>
        <View className="p-8">
          <Text className="text-2xl">{user?.name}</Text>
        </View>
      </View>

      <View className="flex-row  mx-8 space-x-4 mb-2 items-center">
        <FontAwesome name="phone" size={24} color="black" />
        <Text>+62 {user?.phoneNumber}</Text>
      </View>

      <View className="flex-row  mx-8 space-x-4 items-center">
        <Entypo name="address" size={24} color="black" />
        <Text className="mr-2 text-justify"> {user?.address}</Text>
      </View>
      <View className="flex-row  mx-8 mt-3 space-x-4 items-center">
        <FontAwesome5 name="car" size={24} color="black" />
        <Text> {user?.Vehicle?.type} </Text>
        <Text> {user?.Vehicle?.plateNumber}  </Text>
      </View>

      <View className="flex-row mx-5 space-x-3 mt-6">
        <View className="flex-1 items-center justify-center py-6 border border-slate-400 rounded-lg">
          <Text className=""> Ratings</Text>
          <Text className="text-2xl font-semibold">{user?.rating} / 5 </Text>
        </View>
        <View className="flex-1  items-center justify-center py-6 border border-slate-400 rounded-lg">
          <Text>Balance</Text>
          <Text className="text-2xl font-semibold">{user?.money}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.replace("PostRide");
        }}
      >
        <View className="flex-row space-x-4 items-center  mt-2 mx-6 px-4 py-4 bg-slate-100 rounded-md">
         
          <Text className="text-xl">Add Post Ride</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.replace("MyRides");
        }}
      >
        <View className="flex-row space-x-4 items-center mt-2 mx-6 px-4  py-4 bg-slate-100 rounded-md">
         
          <Text className="text-xl">My Rides</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.replace("RideRequest");
        }}
      >
        <View className="flex-row space-x-4 items-center  mt-2 mx-6 p-2 px-4  py-4 bg-slate-100 rounded-md">
         
          <Text className="text-xl">Requested Rides</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View className="flex-row space-x-4 items-center  mt-2 mx-6 p-2 px-4 py-4 bg-slate-100 rounded-md">
         
          <Text className="text-xl">Add Vehicle</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
      >
        <View className="flex-row space-x-4 items-center  mt-6 mx-6 p-2  py-4 bg-slate-100 rounded-md">
          <SimpleLineIcons name="logout" size={24} color="red" />
          <Text className="text-xl text-red-600">Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
