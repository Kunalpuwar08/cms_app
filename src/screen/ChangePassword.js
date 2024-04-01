import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {scale} from '../utils/Matrix';
import {Colors} from '../utils/Colors';
import {Fonts} from '../utils/Fonts';
import CInput from '../components/CInput';
import {bg, changePassImg} from '../assets';
import {changePassCall} from '../apis';
import {useMutation} from '@tanstack/react-query';
import {getData} from '../components/CommonStorage';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  useEffect(() => {
    storedData();
  }, []);

  const storedData = async () => {
    await getData('userData')
      .then(res => {
        console.log(res.email, 'res.user.email');
        setEmail(res.email);
      })
      .catch(err => console.log(err, 'err'));
  };

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const changePassMutation = useMutation({
    mutationFn: changePassCall,
    onSuccess: data => {
      console.log('Succes Data :', data);
      Toast.show({
        type: 'success',
        text1: 'Password Change Successfully',
      });
      navigation.replace('Auth');
    },
    onError: err => {
      console.log(err.data, 'error in api call>>>>>>>>>>>');
      Toast.show({
        type: 'success',
        text1: err.message,
      });
    },
  });

  const onPasswordChange = () => {
    if (oldPass == '' || newPass == '') {
      return;
    }
    const data = {
      email: email,
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPassword: newPass,
    };
    changePassMutation.mutate(data);
  };

  return (
    <ImageBackground style={styles.container} source={bg}>
      <Text style={styles.heading}>Change Password</Text>

      <ScrollView>
        <Image source={changePassImg} style={styles.img} />

        <CInput
          otherStyle={styles.input}
          label={'Enter old Password'}
          onChangeText={txt => setOldPass(txt)}
          secureTextEntry={true}
        />
        <CInput
          otherStyle={styles.input}
          label={'Enter new Password'}
          onChangeText={txt => setNewPass(txt)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btn} onPress={onPasswordChange}>
          <Text style={styles.btnTxt}>Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    padding: scale(12),
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  img: {
    height: scale(300),
    width: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    height: scale(50),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
  },
  btnTxt: {
    fontSize: scale(18),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
