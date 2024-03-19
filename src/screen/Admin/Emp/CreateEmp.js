import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {bg, createEmpImg} from '../../../assets';
import {Colors} from '../../../utils/Colors';
import {scale} from '../../../utils/Matrix';
import CInput from '../../../components/CInput';

const CreateEmp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const create = async () => {
    const data = {name, email};

    await httpService({
      method: 'post',
      url: '/createemp',
      data: data,
    });

    Toast.show({
      type: 'success',
      text2: 'Employee created successfully',
    });
    goBack();
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftBtn} onPress={goBack}>
          <AntDesign name="left" color={Colors.white} size={scale(18)} />
        </TouchableOpacity>
        <Text style={styles.heading}>Create Employee</Text>
      </View>
      <ScrollView style={styles.wrapper}>
        <Image source={createEmpImg} style={styles.img} />
        <CInput
          label={'Name'}
          otherStyle={styles.input}
          onChangeText={txt => setName(txt)}
        />
        <CInput
          label={'Email'}
          otherStyle={styles.input}
          onChangeText={txt => setEmail(txt)}
        />

        <TouchableOpacity style={styles.btn} onPress={create}>
          <Text style={styles.btnTxt}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateEmp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(60),
    padding: scale(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: scale(18),
    color: Colors.white,
  },
  leftBtn: {
    marginHorizontal: scale(12),
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  picker: {
    width: scale(100),
    height: scale(100),
    alignSelf: 'center',
    borderRadius: scale(50),
    marginVertical: scale(18),
  },
  input: {
    width: '90%',
  },
  btn: {
    width: '80%',
    height: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#027BFE',
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: Colors.white,
    textTransform: 'uppercase',
  },
  img: {
    width: '90%',
    height: scale(300),
    resizeMode: 'contain',
  },
});
