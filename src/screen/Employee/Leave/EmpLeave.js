import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CInput from '../../../components/CInput';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {bg, leaveImg} from '../../../assets';
import {UserAuthContext} from '../../../context/authContext';
import CDatePicker from '../../../components/CDatePicker';
import CDropdown from '../../../components/CDropdown';
import {Colors} from '../../../utils/Colors';

const EmpLeave = () => {
  const navigation = useNavigation();

  const useUserAuthContext = () => useContext(UserAuthContext);
  const {token} = useUserAuthContext();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('');

  const leaveTypeDrop = [
    {label: 'Casual', value: 'Casual'},
    {label: 'Sick', value: 'Sick'},
    {label: 'paid', value: 'paid'},
  ];

  const onBack = () => {
    navigation.goBack();
  }

  const applyLeave = async () => {
    let res = await getData('userAuth');
    if (res !== null) {
      const user = res.user;

      const data = {
        companyId: user?.companyId,
        employeeId: user?.id,
        employeeName: user?.name,
        leaveType,
        startDate,
        endDate,
        reason,
      };

      //   await axios
      //     .post(`${API_URL}/applyleave`, data, {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: token,
      //       },
      //     })
      //     .then(res => {
      //       Toast.show({
      //         type: 'success',
      //         text1: res.data.message,
      //       });
      //       navigation.goBack();
      //     })
      //     .catch(err => {
      //       Toast.show({
      //         type: 'error',
      //         text1: err.message,
      //       });
      //       console.error(err);
      //     });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.container} source={bg}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack}>
            <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Employee Leave</Text>
        </View>
        <ScrollView>
          <Image source={leaveImg} style={styles.img} />

          <View style={styles.inputContainer}>
            <CDatePicker
              placeholder={'Start Date'}
              onDateSelect={txt => setStartDate(txt)}
              otherStyle={{width: '80%'}}
            />
            <CDatePicker
              placeholder={'End Date'}
              onDateSelect={txt => setEndDate(txt)}
              otherStyle={{width: '80%'}}
            />
            <CDropdown
              data={leaveTypeDrop}
              placeholder={'Leave Type'}
              label={'Leave Type'}
              onValueChange={txt => setLeaveType(txt)}
              otherStyle={{width: '90%', alignSelf: 'center'}}
            />
            <CInput
              placeholder={'Reason'}
              otherStyle={styles.input}
              onChangeText={txt => setReason(txt)}
            />

            <TouchableOpacity style={styles.btn} onPress={applyLeave}>
              <Text style={styles.btnTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EmpLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  img: {
    width: '100%',
    height: scale(190),
    marginTop: scale(24),
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(50),
  },
  input: {
    width: '90%',
    alignSelf: 'center',
  },
  btn: {
    borderRadius: scale(6),
    height: scale(50),
    backgroundColor: Colors.purple,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(16),
  },
});
