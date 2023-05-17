import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from '@expo/vector-icons';

const CardPost = ({ item }) => {
  const navigation = useNavigation();
  return (
    <GestureDetector
      gesture={
        (doubleTap = Gesture.Tap()
          .maxDuration(250)
          .numberOfTaps(2)
          .onStart(() => {
            // navigation.navigate("Details", { id:item.id });
            navigation.navigate("Details", { item });
          }))
      }
    >
      <View style={styles.card}>
        <View style={styles.left}>
          <View className="">
            <View className="flex-row items-center  ">
            <EvilIcons name="location" size={24} color="black" />
               <Text className="text-xl font-semibold">{item.startLocation}</Text>
            </View>
            
            <View className="ml-3 flex-row space-x-2">
           
              <View className="w-1 h-20 bg-slate-400">
              </View>
              <Text style={styles.leftText}>
              {item.departureTime}
            </Text>
            </View>
            <View className="flex-row items-center">
            <EvilIcons name="location" size={24} color="black" />
            <Text className="text-xl font-semibold">{item.destination}</Text> 
            </View>
            <View className="ml-4">
               <Text style={styles.leftText}>{item.arrivalTime}</Text>
            </View>

          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>{item?.price}</Text>
          <View style={styles.bottom}>
            <Text style={styles.seats}>seats: {item?.seats}</Text>
          </View>
          <View className="flex flex-row items-center ">
            <Text className="text-slate-500 mr-2">{item?.UserRides[0].User.name}</Text>
            <View className="bg-slate-200 rounded-full border w-10 h-10 justify-self-end ">
              <Image
                className="w-full h-full object-cover rounded-full "
                source={{ uri: item?.UserRides[0].User.photo }}
              />
            </View>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
};

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
});

export default CardPost;
