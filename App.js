import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import UserAuthProvider from './src/context/authContext';
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <UserAuthProvider>
      <NavigationContainer>
        <AppNavigation />
        <Toast />
      </NavigationContainer>
    </UserAuthProvider>
  );
};

export default App;
