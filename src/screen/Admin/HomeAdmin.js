import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {
  bg,
  AssetIcon,
  LeaveIcon,
  ProfileIcon,
  ProjectIcon,
  employeeImg,
} from '../../assets';
import {dashboardCall, logoutCall} from '../../apis';
import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import CHeaderCard from '../../components/CHeaderCard';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {deleteData, getData} from '../../components/CommonStorage';
import Toast from 'react-native-toast-message';

const HomeAdmin = () => {
  const navigation = useNavigation();
  const [listData, setListData] = useState([]);

  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardCall,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutCall,
    onSuccess: async data => {
      console.log('Succes Data :', data);
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
    },
    onError: err => {
      Toast.show({
        type: 'success',
        text1: err.message,
      });
    },
  });

  useEffect(() => {
    setListData(dashboardQuery.data?.data);
  }, [dashboardQuery?.isLoading]);

  const logout = async () => {
    const sData = await getData('userData');
    const data = {userId: sData._id, userType: sData.role};
    logoutMutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground source={bg} style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>CMS</Text>
          <View style={styles.headerBtnContainer}>
            <TouchableOpacity style={styles.headerBtn} onPress={logout} activeOpacity={0.8}>
              <AntDesign name="logout" size={scale(20)} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.8}
              style={styles.headerBtn}
              onPress={() => navigation.navigate('Notification')}>
              <Ionicons
                name="notifications-outline"
                size={scale(20)}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardConatiner}>
          <CHeaderCard
            name={'Project'}
            navigate={'ListAdminProject'}
            source={ProjectIcon}
          />
          <CHeaderCard
            name={'Employee'}
            navigate={'ListEmp'}
            source={ProfileIcon}
          />
          <CHeaderCard
            name={'Asset'}
            navigate={'ListAsset'}
            source={AssetIcon}
          />
          <CHeaderCard
            name={'Leave'}
            navigate={'AdminLeave'}
            source={LeaveIcon}
          />
        </View>

        {/*  */}
        <View style={styles.boxContainer}>
          <Image source={employeeImg} style={{width: '50%', height: '90%'}} />
          <View style={{width: '49%'}}>
            <Text style={styles.cardTitle}>
              Total Employees: {listData?.employeeCount}
            </Text>
            <Text style={styles.cardTitle}>
              Projects: {listData?.projectCount}
            </Text>
            <Text style={styles.cardTitle}>Assets: {listData?.assetCount}</Text>
            <Text style={styles.cardTitle}>
              on Leave: {listData?.activeLeaveCount}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  main: {flex: 1},
  header: {
    padding: scale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  headerBtnContainer: {
    flexDirection: 'row',
  },
  headerBtn: {
    paddingHorizontal: scale(6),
  },
  cardConatiner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: scale(100),
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  cardWrapper: {
    padding: scale(12),
    alignItems: 'center',
    width: '25%',
  },
  card: color => ({
    elevation: 6,
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: color,
  }),
  cardTxt: {
    margin: scale(8),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(8),
  },
  boxContainer: {
    width: '90%',
    margin: scale(12),
    height: scale(150),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    padding: scale(8),
  },
  cardTitle: {
    color: Colors.blue,
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
  },
});
