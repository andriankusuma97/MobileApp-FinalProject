import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainStack from './navigators/MainStack';
import { Provider } from "react-redux";
import store from "./store"

export default function App() {
  
  return (
    
  <SafeAreaView className="flex-1 relative mt-10">
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
          <MainStack/>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
