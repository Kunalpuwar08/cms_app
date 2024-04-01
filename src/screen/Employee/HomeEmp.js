import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  AssetIcon,
  LeaveIcon,
  ProfileIcon,
  ProjectIcon,
  TimesheetIcon,
  TodoIcon,
  bg,
  working,
} from '../../assets';
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
          <Image source={working} style={styles.imgContainer} />
          <View style={styles.txtContainer}>
            <Text style={styles.day}>Day: {chartData.todayDayCount}</Text>
            <Text style={styles.day}>
              Total days: {chartData.workingDaysCount}
            </Text>
          </View>
        </View>

        {/* Tools */}
        <View style={styles.toolsContainer}>
          {/* <TouchableOpacity> */}
            <Text style={styles.seeAll}>Tools </Text>
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.cardContainer}>
          <CommonCard
            name={'Profile'}
            source={ProfileIcon}
            onPress={() => navigation.navigate('Profile')}
          />
          <CommonCard
            name={'Project'}
            source={ProjectIcon}
            onPress={() => navigation.navigate('ListProject')}
          />
          <CommonCard
            name={'Leave'}
            source={LeaveIcon}
            onPress={() => navigation.navigate('EmployeeLeave')}
          />
          <CommonCard
            name={'Assets'}
            source={AssetIcon}
            onPress={() => navigation.navigate('ListAssetEmp')}
          />
          <CommonCard
            name={'Timesheet'}
            source={TimesheetIcon}
            onPress={() => navigation.navigate('ListTimesheet')}
          />
          <CommonCard
            name={'Todo'}
            source={TodoIcon}
            onPress={() => navigation.navigate('TodoList')}
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
    padding: scale(8),
    height: scale(120),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  imgContainer:{
    width:'40%',
    resizeMode:'contain',
  },
  txtContainer: {
    width: '50%',
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
  cardContainer: {
    width: '90%',
    height: 'auto',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:scale(12)
  },
});
