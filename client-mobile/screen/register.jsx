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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const BASE_URL = "http://192.168.100.167:4002";

export default function RegisterScreen() {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [idUploaded, setidUploaded] = useState(false);
  const [idCardImg, setidCardImg] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [name, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const ext = uri.split(".").pop();
      const name = uri.split("/").pop();
      setidCardImg({
        uri: uri,
        type: `image/${ext}`,
        name,
      });
      setidUploaded(true);
    }
  };

  const pickPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const ext = uri.split(".").pop();
      const name = uri.split("/").pop();
      setPhoto({
        uri: uri,
        type: `image/${ext}`,
        name,
      });
      setPhotoUploaded(true);
    }
  };

  const handleRegisterSubmit = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("password", password);
    data.append("photo", photo);
    data.append("idCardImg", idCardImg);
    // console.log(data);
    try {
      if (password !== confirmPassword) {
        // show an error message or alert
        return;
      }
      console.log(data, "<<<<<< data dari register ");
      const res = await axios.post(BASE_URL + "/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      if (!res.ok) {
        throw new Error(await res.text());
      }

      console.log("Uploaded");
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // console.log(photo);
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
        placeholder="Name"
        autoCapitalize="words"
        placeholderTextColor="#8e9eb6"
        value={name}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#8e9eb6"
        autoCapitalize="words"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#8e9eb6"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#8e9eb6"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#8e9eb6"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#8e9eb6"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#8e9eb6"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <MaterialCommunityIcons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#8e9eb6"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.uploadButton]} onPress={pickImage}>
        <Text style={[styles.uploadButtonText, { color: "#1f2d5a" }]}>
          {idUploaded ? "ID Upload Success" : "Upload ID Card Image"}
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[styles.uploadButton, { backgroundColor: "#fff" }]}
        onPress={pickPhoto}
      >
        <Text style={[styles.uploadButtonText, { color: "#1f2d5a" }]}>
        {photoUploaded ? "Photo Upload Success" : "Upload Photo"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegisterSubmit}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
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
    width: 150,
    height: 150,
    marginBottom: 30,
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
  uploadButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#1f2d5a",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#3a66b2",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  passwordToggle: {
    marginRight: 10,
  },
});
