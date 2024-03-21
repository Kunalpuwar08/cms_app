import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {bg} from '../../../assets';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {useQuery} from '@tanstack/react-query';
import CInput from '../../../components/CInput';
import {getEmployeeDetails} from '../../../apis';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import httpService from '../../../utils/https';
import Toast from 'react-native-toast-message';
import {deleteData} from '../../../components/CommonStorage';

const Profile = () => {
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);

  const empQuery = useQuery({
    queryKey: ['employee'],
    queryFn: getEmployeeDetails,
  });

  const {name, email, companyName, address, phone, _id, role} =
    empQuery.data?.data || {};

  const [empName, setName] = useState(name);
  const [empEmail, setEmail] = useState(email);
  const [empComp, setComp] = useState(companyName);
  const [empPhone, setPhone] = useState(phone);
  const [empAddress, setAddress] = useState(address);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggle = async () => {
    setIsEditable(!isEditable);
    try {
      if (isEditable) {
        const data = {
          name: empName,
          email: empEmail,
          companyName: empComp,
          phone: empPhone,
          address: empAddress,
        };

        await httpService({
          method: 'put',
          url: `/updateProfile/${_id}`,
          data: data,
        });
        Toast.show({
          type: 'success',
          text1: 'Profile updated Successfully',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Somthing went wrong',
      });
    }
  };

  const onLogout = async () => {
    try {
      const data = {userId: _id, userType: role};
      await httpService({
        method: 'post',
        url: '/logout',
        data: data,
      });
      Toast.show({
        type: 'success',
        text1: 'Logout Successful',
      });

      await deleteData('userToken');
      await deleteData('userData');
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    } catch (error) {
      console.log(error, 'Error>>>>>>>>>>>>>');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={{flex: 1}}>
        {/* header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack}>
            <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Inputs */}
        <ScrollView style={{marginTop: scale(18)}}>
          <CInput
            placeholder="Enter Your Name"
            value={empName}
            otherStyle={styles.input}
            editable={isEditable ? true : false}
            onChangeText={txt => setName(txt)}
          />
          <CInput
            placeholder="Enter Your Email"
            value={empEmail}
            otherStyle={styles.input}
            editable={false}
            onChangeText={txt => setEmail(txt)}
          />
          <CInput
            placeholder="Enter Your companyName"
            value={empComp}
            otherStyle={styles.input}
            editable={false}
            onChangeText={txt => setComp(txt)}
          />
          <CInput
            placeholder="Enter Your Phone no"
            value={empPhone}
            otherStyle={styles.input}
            onChangeText={txt => setPhone(txt)}
            editable={isEditable ? true : false}
          />
          <CInput
            placeholder="Enter Your Address"
            otherStyle={styles.input}
            value={empAddress}
            onChangeText={txt => setAddress(txt)}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            editable={isEditable ? true : false}
          />

          <TouchableOpacity
            style={styles.btn(Colors.purple)}
            onPress={onToggle}>
            <Text style={styles.btnTxt(Colors.white)}>
              {isEditable ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn(Colors.white)} onPress={onLogout}>
            <Text style={styles.btnTxt(Colors.black)}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(18),
    marginLeft: scale(12),
  },
  input: {
    width: '90%',
    alignSelf: 'center',
  },
  btn: backgroundColor => ({
    width: '80%',
    height: scale(50),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: backgroundColor,
  }),
  btnTxt: color => ({
    fontSize: scale(18),
    color: color,
    fontFamily: Fonts.AntaRegular,
  }),
});
