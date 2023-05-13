import { View, Text, TouchableOpacity, TextInput, Button,Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Octicons,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign,
  
} from "@expo/vector-icons";
import axios from "axios";
const BASE_URL = "http://192.168.100.167:4002";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const PostRideScreen = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const handleRide = async () => {
    const toPost = {
      startLocation: origin,
      destination,
      departureTime,
      arrivalTime,
      price,
      seats,
    };

    // console.log(data);
    try {
      console.log(toPost, "<<<<< data add ne post");
      const access_token = await AsyncStorage.getItem("access_token");
      const res = await axios.post(BASE_URL + "/rides", toPost, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          access_token: access_token,
        },
      });
      // console.log(res);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      Alert.alert('Success Adding New Ride');
      console.log("Uploaded");
    } catch (error) {
      console.log(error);
    }
    navigation.replace("Home");
  };

  const onChangeDeparture = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDepartureTime(currentDate);
  };
  const onChangeArrival = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setArrivalTime(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);

    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  console.log(arrivalTime, departureTime, "<<<date Arrival");
  console.log(departureTime, "<<<date deparute ");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="mx-6 my-4 mb-4 ">
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Home");
          }}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View className="mx-10 mt-2 mb-12">
        <Text className="text-4xl font-bold">Post A Ride</Text>
      </View>
      {}

      <TextInput
        name="origin"
        className="bg-background py-4 w-10/12 text-white text-lg   mx-auto rounded-2xl mb-4 px-4"
        placeholder="Origin"
        placeholderTextColor="#8e9eb6"
        onChangeText={setOrigin}
        val
        ue={origin}
      />
      <TextInput
        name="destination"
        className="bg-background text-white text-lg  py-4 w-10/12 items-center justify-center mx-auto rounded-2xl mb-4 px-4"
        placeholder="Destination"
        placeholderTextColor="#8e9eb6"
        onChangeText={setDestination}
        value={destination}
      />
        <TouchableOpacity
          className="bg-background text-white text-lg  py-4 w-10/12 items-center justify-center mx-auto rounded-2xl mb-4 px-4"
          onPress={showDatepicker}
          title="Show date picker!"
        >
          <Text className="text-slate-100 text-lg  font-semibold">
          Departure Time
        </Text>
        </TouchableOpacity>
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={departureTime}
            mode={mode}
            is24Hour={true}
            onChange={onChangeDeparture}
          />
        )}
   
        <TouchableOpacity
          className="bg-background hover:bg-blue-700 text-white text-lg py-4 w-10/12 items-center justify-center mx-auto rounded-2xl mb-4 px-4"
          onPress={showDatepicker}
          title= "Pick Arrival Time"
        >
           <Text className="text-slate-100 text-lg  font-semibold">
          Arrival Time  </Text>
        </TouchableOpacity>
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={arrivalTime}
            mode={mode}
            is24Hour={true}
            onChange={onChangeArrival}
          />
        )}
 

      <TextInput
        name="price"
        keyboardType="numeric"
        className="bg-background text-white text-lg  py-4 w-10/12 items-center justify-center mx-auto rounded-2xl mb-4 px-4"
        placeholder="Price"
        placeholderTextColor="#8e9eb6"
        onChangeText={setPrice}
        value={price}
      />
      <TextInput
        name="seats"
        keyboardType="numeric"
        className="bg-background text-white text-lg  py-4 w-10/12 items-center justify-center mx-auto rounded-2xl mb-4 px-4"
        placeholder="Seats"
        placeholderTextColor="#8e9eb6"
        onChangeText={setSeats}
        value={seats}
      />

      <TouchableOpacity
        className="bg-accent mt-8 py-4 w-2/5 items-center justify-center mx-auto rounded-2xl mb-4"
        onPress={handleRide}
      >
        <Text className="text-white text-2xl text-center font-semibold">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostRideScreen;
