import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import httpService from '../../../utils/https';
import {bg, profileImg} from '../../../assets';
import React, {useEffect, useState} from 'react';
import CLoader from '../../../components/CLoader';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListEmp = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [listOfEmployee, setListOfEmployee] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function callApi() {
      const responce = await httpService({
        method: 'get',
        url: '/getEmp',
      });
      setListOfEmployee(responce.data);
      setLoading(false);
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

      <CLoader visible={loading} />
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
    width: '90%',
    height: scale(60),
    padding: scale(12),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100%',
    padding: scale(20),
    height: scale(150),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    marginVertical: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
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
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
    borderRadius: scale(50),
  },
  floatBtn: {
    right: scale(10),
    width: scale(60),
    height: scale(60),
    bottom: scale(10),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: scale(30),
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  id: {
    width: '55%',
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
