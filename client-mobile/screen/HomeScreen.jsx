import React, { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  DatePickerAndroid  ,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons,Feather, Entypo,  EvilIcons,AntDesign 
} from "@expo/vector-icons";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import CardPost from "../components/CardPost";
import { fetchDataRides,fetchCurrentUser } from "../store/action/actionCreator";
import AsyncStorage from "@react-native-async-storage/async-storage";
const access_token = AsyncStorage.getItem("access_token");


export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [clicked, setCLicked] = useState(null);
  const [searchPhrase, setSearchPhrase] = useState(null);
  // const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {rides,ridesLoading} = useSelector((state)=>{
    return state.ridesReducer
  })
  const {user,userLoading} = useSelector((state)=>{
    return state.userReducer
  })

  function handleSearch(){
    dispatch(fetchDataRides(origin,destination))
    setDestination("")
    setOrigin("")
  }
  async function handleUser(){
    await dispatch(fetchCurrentUser())
    // setUser(user)
  }

  useEffect(() => {
    handleUser()
    dispatch(fetchDataRides())
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  
  return (
    <View style={styles.container}>
      <View className="flex-row justify-between items-center  w-11/12 mt-5 mb-5 bg-slate-200 py-3 px-4 rounded-md">
        <View>
          <Text className="">Share A Ride</Text>
          <Text className="text-xl text-green-900">Welcome, {user?.name}!</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace("Profile")}>
          <View className="w-12 h-12 bg-slate-300 rounded-md items-center justify-center">
            <Image
              className="w-full h-full "
              source={{
                uri: user?.photo,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row  w-full">
      <View className="flex flex-row w-full items-center space-x-1 justify-center">
        <View
          className={
            clicked
              ? "bg-white flex-row w-40 mb-2 justify-evenly rounded-xl p-2 px-3 items-center "
              : "bg-white flex-row w-40 mb-2   rounded-xl p-2 items-center "
          }
        >
          {/* search Icon */}
          <EvilIcons
            name="location"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
          {/* Input field */}
          <TextInput
            style={styles.input}
            className="text-sm"
            placeholder="Origin"
            value={origin}
            onChangeText={setOrigin}
            returnKeyType="search"
            onFocus={() => {
              setCLicked(true);
            }}
          />
          {/* cross Icon, depending on whether the search bar is clicked or not */}
          {clicked && (

            <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                setSearchPhrase("")
            }}/>
          )}
        </View>
        <View
          className={
            clicked
              ? "bg-white flex-row w-40  mb-2 justify-evenly rounded-xl p-2 px-3 items-center "
              : "bg-white flex-row w-40  mb-2   rounded-xl p-2 items-center "
          }
        >
          {/* search Icon */}
          <EvilIcons
            name="location"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
          />
          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
            returnKeyType="search"
            onFocus={() => {
              setCLicked(true);
            }}
          />
          {clicked && (
            <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                setSearchPhrase("")
            }}/>
          )}
        </View>
        <TouchableOpacity onPress={handleSearch}>
            <View className="bg-white w-10 h-10 rounded-xl items-center justify-center mb-2">
              <AntDesign name="search1" size={24} color="black" />
            </View>
        </TouchableOpacity>
      </View>
      
      </View>

      <FlatList
        style={styles.list}
        data={rides}
        renderItem={({ item }) => <CardPost item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2d5a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  list: {
    width: "100%",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftText: {
    fontSize: 16,
    marginTop: 5,
    color: "#1f2d5a",
    textAlign: "left",
  },
  line: {
    width: 1,
    height: 60,
    backgroundColor: "#1f2d5a",
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2d5a",
    marginBottom: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seats: {
    fontSize: 16,
    color: "#8e9eb6",
    marginRight: 10,
  },
  user: {
    fontSize: 16,
    color: "#8e9eb6",
  },
  filter: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
  },

 
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },

});

