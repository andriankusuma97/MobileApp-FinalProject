import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';
const BASE_URL = "http://192.168.100.167:4002";


export default function Payment() {
  const navigation = useNavigation();
  const route = useRoute();
  const {redirect_url} = route.params;

  return (
    <WebView
      style={styles.container}
      source={{ uri: redirect_url }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
