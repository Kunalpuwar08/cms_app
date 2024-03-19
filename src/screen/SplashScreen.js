import {ImageBackground, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {bg} from '../assets';
import {Fonts} from '../utils/Fonts';
import {scale} from '../utils/Matrix';
import {Colors} from '../utils/Colors';
import {getData} from '../components/CommonStorage';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    async function checkNav() {
      const token = await getData('userToken');
      const userData = await getData('userData');
      if (token) {
        userData.isPasswordChanged ?(
        userData.role === 'admin'
          ? navigation.replace('AdminHome')
          : navigation.replace('EmployeeHome')):
          navigation.navigate("ChangePassword")
      } else {
        navigation.replace('Auth');
      }
    }
    checkNav();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.img}>
        <Text style={styles.txt}>CMS</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(40),
    color: Colors.white,
  },
});
