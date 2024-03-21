import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import UserAuthProvider, {UserAuthContext} from './src/context/authContext';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {saveData} from './src/components/CommonStorage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


const App = () => {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function registerAppWithFCM() {
      const res = await messaging().registerDeviceForRemoteMessages();
      return res;
    }
    registerAppWithFCM();
  }, []);

  useEffect(() => {
    async function getFCMToken() {
      try {
        const token = await messaging().getToken();
        if (token) {
          console.log('FCM Token:', token);
          await saveData('@fcm', token);
        } else {
          console.log('FCM Token not available');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    }

    getFCMToken();
  }, []);

  return (
    <UserAuthProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
        <Toast />
      </NavigationContainer>
    </UserAuthProvider>
  );
};

export default App;
