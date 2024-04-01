import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {bg} from '../../../assets';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {useQuery} from '@tanstack/react-query';
import {timesheetListCall} from '../../../apis';
import React, {useEffect, useState} from 'react';
import CHeader from '../../../components/CHeader';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListTimesheet = () => {
  const navigation = useNavigation();
  const [listData, setListData] = useState([]);

  const empTimesheetQuery = useQuery({
    queryKey: ['empTimesheetList'],
    queryFn: timesheetListCall,
  });

  useEffect(() => {
    setListData(empTimesheetQuery.data?.data);
  }, [empTimesheetQuery?.isLoading]);

  const renderCard = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.date}>{moment(item.date).format('l')}</Text>
        <Text style={styles.hoursTxt}>hours: {item.hours}</Text>
        <Text style={styles.descriptionTxt}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <CHeader title={'List Timesheet'} />

        <FlatList
          data={listData}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
        />

        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => navigation.navigate('CreateTimesheet')}>
          <AntDesign name="plus" color={Colors.white} size={scale(20)} />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListTimesheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  floatBtn: {
    right: scale(15),
    width: scale(50),
    bottom: scale(20),
    height: scale(50),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(25),
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  card: {
    width: '90%',
    margin: scale(8),
    height: scale(80),
    padding: scale(12),
    alignSelf: 'center',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
  },
  date: {
    color: Colors.black,
    fontSize: scale(14),
    fontFamily: Fonts.AntaRegular,
  },
  hoursTxt: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  descriptionTxt: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
});
