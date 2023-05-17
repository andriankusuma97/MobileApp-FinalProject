import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,TextInput} from 'react-native';
import axios from 'axios'
const BASE_URL = "http://192.168.100.167:4002";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';


const ModalAddVihecle = (props) => {
  const [type, setType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
 const navigation =useNavigation()

  const closeModal= async (bool,data) =>{
    try {
      // console.log(type,plateNumber,"<<<<< data add ne modal");
      const access_token = await AsyncStorage.getItem("access_token");
      const res = await axios.post(
        BASE_URL + "/vehicles",
        {type,plateNumber},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "access_token": access_token,
          },
        }
      );
      // console.log(res);
      if (!res.ok) {
        throw new Error(await res.text());
      }

      // console.log("Uploaded");
      navigation.replace('Profile')
    } catch (error) {
      console.log(error);
    }
    props.changeModalVisible(bool)
  } 
  return (
    <View className="fixed h-full  backdrop-blur-md bg-white/80 flex justify-center items-center">
      <View className=" bg-white  w-11/12 rounded-lg border shadow dark:bg-gray-700" >
          <View className=" p-4 border-b rounded-t dark:border-gray-600 items-center" >
              <TextInput
            name="type"
            className="bg-background py-4 w-11/12 text-white text-lg   mx-auto rounded-2xl mb-4 px-4"
            placeholder="Vehicle"
            autoCapitalize="words"
            placeholderTextColor="#8e9eb6"
            onChangeText={setType}
            value={type}
            
          />
              <TextInput
            name="plateNumber"
            className="bg-background py-4 w-11/12 text-white text-lg   mx-auto rounded-2xl mb-4 px-4"
            placeholder="Plate Number"
            autoCapitalize="characters"
            placeholderTextColor="#8e9eb6"
            onChangeText={setPlateNumber}
            value={plateNumber}
          />
            <Pressable
            className="bg-accent rounded-xl py-3 w-24"
              onPress={() => closeModal(false)}>
              <Text className="text-xl text-white text-center">Submit</Text>
            </Pressable>
          </View>
        </View>
    </View>
  )
}

export default ModalAddVihecle

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});