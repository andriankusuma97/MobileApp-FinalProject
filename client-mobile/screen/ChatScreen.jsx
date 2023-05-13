import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row px-5 py-4 my-4 mb-4 bg-accent w-full items-center space-x-3">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl ">{item.user}</Text>
      </View>
      <Text>ChatScreen</Text>
      <View className="flex-1 justify-end mb-4 ">
        <View className="flex-row items-center  space-x-2">
          <TextInput
            className="border p-2 px-4 w-2/3 ml-10 rounded-xl"
            placeholder="text...."
            placeholderTextColor="#8e9eb6"
          />
          <TouchableOpacity onPress={() => {
          
          }}>
            <View className="bg-sky-300 p-2 px-4 rounded-xl">
              <Feather name="send" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
