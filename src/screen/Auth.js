import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {loginSvg} from '../assets';
import {scale} from '../utils/Matrix';
import React, {useState} from 'react';
import {Colors} from '../utils/Colors';
import CInput from '../components/CInput';
import CLoader from '../components/CLoader';
import {useNavigation} from '@react-navigation/native';
import httpService from '../utils/https';
import {saveData} from '../components/CommonStorage';

const Auth = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const data = {email: email, password: password};

      const responce = await httpService({
        method: 'post',
        url: '/login',
        data: data,
      });
      setLoading(false);
      console.log(responce.data,"responce.data>>>>>>>>>>>>>>>>>");
      await saveData('userToken', responce.data.token);
      await saveData('userData', responce.data.user);
      if (responce.data.user.role == 'admin') {
        navigation.navigate('AdminHome');
      } else if (responce.data.user.role == 'employee') {
        navigation.navigate('EmployeeHome');
      }
    } catch (error) {
      setLoading(false);
      console.log('Catch Eroor>>>>>>>>');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={loginSvg} style={styles.img} />
        <View style={styles.inputContainer}>
          <CInput
            label={'Email'}
            otherStyle={styles.input}
            onChangeText={txt => setEmail(txt)}
          />
          <CInput
            label={'Password'}
            otherStyle={styles.input}
            onChangeText={txt => setPassword(txt)}
          />

          <TouchableOpacity style={styles.btn} onPress={onLogin}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>

          <CLoader visible={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {
    width: '100%',
    height: scale(300),
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '90%',
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#64a5ff',
  },
  btnTxt: {
    color: Colors.white,
    fontSize: scale(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
