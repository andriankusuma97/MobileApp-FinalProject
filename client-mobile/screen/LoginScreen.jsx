import React, { useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { handleLogin } from "../store/action/actionCreator";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmitLogin(){
    const user={
      email,password,
    }
    await dispatch(handleLogin(user))
    navigation.replace("Home");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-no-background.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#8e9eb6"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        placeholderTextColor="#8e9eb6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmitLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Register")}
      ></TouchableOpacity>
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
  logo: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: 50,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: "#000",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#3a66b2",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    marginTop: 20,
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
