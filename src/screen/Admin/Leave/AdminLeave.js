import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {bg} from '../../../assets';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {Fonts} from '../../../utils/Fonts';
import httpService from '../../../utils/https';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {listLeaves, updateLeaveRequest} from '../../../apis';

const AdminLeave = () => {
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);
  const [activeState, setActiveState] = useState(0);
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const empQuery = useQuery({
    queryKey: ['leaves'],
    queryFn: listLeaves,
  });

  const updateMutation = useMutation({
    mutationFn: updateLeaveRequest,
    onSuccess: data => {
      console.log('Succes Data :', data);
    },
  });

  const getListRequest = useCallback(async () => {
    try {
      const listData = empQuery.data;
      setApiData(listData?.data);

      let pendingdata = listData?.data.filter((i, e) => i.status === 'pending');
      setPendingData(pendingdata);

      let completeddata = listData?.data.filter(
        (i, e) => i.status !== 'pending',
      );
      setCompletedData(completeddata);
    } catch (error) {
      console.log(error, 'Error in fetching Data');
    }
  }, []);

  useEffect(() => {
    getListRequest();
  }, []);

  const renderCard = useCallback(({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <View>
          <Text style={styles.reuse}>ID: {item.employeeId}</Text>
          <Text style={styles.reuse}>Name: {item.employeeName}</Text>
          <Text style={styles.reuse}>
            Duration: {moment(item.startDate).format('ll')} -{' '}
            {moment(item.endDate).format('ll')}
          </Text>
          <Text style={styles.reuse}>Type: {item.leaveType}</Text>
          <Text style={styles.reuse}>Reason: {item.reason}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn(Colors.red)}
            onPress={() => updateLeave(item, 'reject')}>
            <Text style={styles.btnTxt}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn(Colors.blue)}
            onPress={() => updateLeave(item, 'approve')}>
            <Text style={styles.btnTxt}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderCompletedCard = useCallback(({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.reuse}>ID: {item.employeeId}</Text>
        <Text style={styles.reuse}>Name: {item.employeeName}</Text>
        <Text style={styles.reuse}>
          Duration: {moment(item.startDate).format('ll')} -{' '}
          {moment(item.endDate).format('ll')}
        </Text>
        <Text style={styles.reuse}>Type: {item.leaveType}</Text>
        <Text style={styles.reuse}>Reason: {item.reason}</Text>
      </View>
    );
  }, []);

  const updateLeave = async (item, action) => {
    updateMutation.mutate(item, action);
    // try {
    //   Toast.show({
    //     type: 'success',
    //     text1: `leave req for ${item?.employeeName} is ${action}`,
    //   });
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: `somthing went wrong`,
    //   });
    // }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="left" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Leave Management</Text>
      </View>

      <View style={styles.toggleBtnContainer}>
        <TouchableOpacity
          style={styles.toggleBtn(activeState == 0 ? 1 : 0)}
          onPress={() => setActiveState(0)}>
          <Text style={styles.toggleBtnTxt}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleBtn(activeState == 1 ? 1 : 0)}
          onPress={() => setActiveState(1)}>
          <Text style={styles.toggleBtnTxt}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeState === 0 ? (
          <FlatList
            data={pendingData}
            renderItem={renderCard}
            keyExtractor={(item, index) => item.id}
          />
        ) : (
          <FlatList
            data={completedData}
            renderItem={renderCompletedCard}
            keyExtractor={(item, index) => item.id}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default AdminLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(50),
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: scale(18),
    color: Colors.white,
    marginLeft: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  card: {
    width: '90%',
    height: scale(150),
    padding: scale(12),
    alignSelf: 'center',
    borderRadius: scale(12),
    marginVertical: scale(12),
    backgroundColor: Colors.white,
  },
  btnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: color => ({
    width: '45%',
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(6),
    backgroundColor: color,
    justifyContent: 'center',
    marginVertical: scale(5),
  }),
  btnTxt: {
    color: Colors.white,
    fontSize: scale(14),
    fontFamily: Fonts.AntaRegular,
  },
  reuse: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  toggleBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleBtn: border => ({
    width: '50%',
    height: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: border,
    borderColor: Colors.white,
  }),
  toggleBtnTxt: {
    color: Colors.white,
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
  },
});
