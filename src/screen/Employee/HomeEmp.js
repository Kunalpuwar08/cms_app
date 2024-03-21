import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {bg} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import httpService from '../../utils/https';
import CommonCard from '../../components/CommonCard';
import {useNavigation} from '@react-navigation/native';
import {UserAuthContext} from '../../context/authContext';
import React, {useContext, useEffect, useState} from 'react';

const HomeEmp = () => {
  const navigation = useNavigation();
  const [chartData, setChartData] = useState({});

  const useUserAuthContext = () => useContext(UserAuthContext);
  const {userData} = useUserAuthContext();

  useEffect(() => {
    getWorkingDays();
  }, []);

  const getWorkingDays = async () => {
    const responce = await httpService({
      method: 'get',
      url: '/working-days',
    });
    setChartData(responce.data);
  };

  return (
    <ScrollView scrollEnabled contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={{flex: 1}} />
      <ImageBackground source={bg} style={styles.container}>
        {/* header */}
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeTxt}>
            Welcome to {userData?.companyName}
          </Text>
          <Text style={styles.nameTxt}>{userData?.name}</Text>
        </View>

        {/* box */}
        <View style={styles.box}>
          <View style={styles.txtContainer}>
            <Text style={styles.day}>Day: {chartData.todayDayCount}</Text>
            <Text style={styles.day}>
              Total days: {chartData.workingDaysCount}
            </Text>
          </View>
        </View>

        {/* Tools */}
        <View style={styles.toolsContainer}>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All Tools </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            flexWrap: 'wrap',
            height: 'auto',
            overflow: 'hidden',
          }}>
          <CommonCard
            name={'Profile'}
            onPress={() => navigation.navigate('Profile')}
          />
          <CommonCard
            name={'Project'}
            onPress={() => navigation.navigate('')}
          />
          <CommonCard
            name={'Leave'}
            onPress={() => navigation.navigate('EmployeeLeave')}
          />
          <CommonCard name={'Assets'} onPress={() => navigation.navigate('')} />
          <CommonCard
            name={'Timesheet'}
            onPress={() => navigation.navigate('')}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default HomeEmp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: scale(100),
    padding: scale(22),
    marginVertical: scale(8),
  },
  welcomeTxt: {
    color: Colors.white,
    fontSize: scale(18),
    fontFamily: Fonts.AntaRegular,
  },
  nameTxt: {
    color: Colors.white,
    fontSize: scale(22),
    fontFamily: Fonts.AntaRegular,
  },
  box: {
    width: '90%',
    elevation: 6,
    height: scale(120),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    padding: scale(8),
  },
  txtContainer: {
    width: '40%',
  },
  day: {
    color: Colors.blue,
    fontSize: scale(16),
    lineHeight: scale(30),
    fontFamily: Fonts.AntaRegular,
  },
  toolsContainer: {
    width: '100%',
    marginLeft: '5%',
    height: scale(40),
    paddingTop: scale(12),
    marginVertical: scale(12),
  },
  seeAll: {
    fontSize: scale(16),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
});
