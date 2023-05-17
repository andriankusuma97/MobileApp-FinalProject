import React, { useLayoutEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const BASE_URL = "https://192.168.100.167:4002";

export default function LandingScreen() {
  const navigation = useNavigation();
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    })
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-no-background.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2d5a', // change the background color to a dark blue
  },
  logo: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 50,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#3a66b2', // change the button color to a lighter blue
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
