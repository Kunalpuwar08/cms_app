import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {UserAuthContext} from '../../../context/authContext';
import {bg, profileImg} from '../../../assets';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {Fonts} from '../../../utils/Fonts';
import httpService from '../../../utils/https';

const ListEmp = () => {
  const navigation = useNavigation();

  const useUserAuthContext = () => useContext(UserAuthContext);
  const {token} = useUserAuthContext();

  const [listOfEmployee, setListOfEmployee] = useState([]);

  useEffect(() => {
    async function callApi() {
      const responce = await httpService({
        method: 'get',
        url: '/getEmp',
      });
      setListOfEmployee(responce.data);
    }
    callApi();
  }, []);

  const renderCard = ({item, index}) => {
    const data = item;
    return (
      <View style={styles.card} key={index}>
        <View>
          <Image source={profileImg} style={styles.img} />
        </View>
        <View style={{width: '55%'}}>
          <Text style={styles.id} numberOfLines={1}>
            Id: {data?._id}
          </Text>
          <Text style={styles.name}>{data?.name}</Text>
          <Text style={styles.designation}>{data?.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>List Of Employee</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={listOfEmployee}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(80)}}
        />
      </View>

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('CreateEmp')}>
        <AntDesign name="plus" size={scale(18)} color={Colors.white} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ListEmp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: scale(150),
    backgroundColor: Colors.white,
    marginVertical: scale(12),
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
    width: '100%',
  },
  name: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    textTransform: 'uppercase',
  },
  designation: {
    fontSize: scale(12),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
  img: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
    resizeMode: 'contain',
  },
  floatBtn: {
    position: 'absolute',
    bottom: scale(10),
    right: scale(10),
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  id: {
    width: '55%',
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
