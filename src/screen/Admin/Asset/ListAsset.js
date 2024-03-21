import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bg} from '../../../assets';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import httpService from '../../../utils/https';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListAsset = () => {
  const navigation = useNavigation();
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    async function getList() {
      const responce = await httpService({
        method: 'get',
        url: '/asset/listAsset',
      });
      setAssetList(responce?.data?.assignedAssets);
    }
    getList();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const renderCard = ({item, index}) => {
    console.log(item);
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <Image source={{uri: item.imageUrl}} style={styles.assetImg} />
        <View style={{width: '45%'}}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.brand}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.bgImg}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftBtn} onPress={goBack}>
            <AntDesign name="left" color={Colors.white} size={scale(18)} />
          </TouchableOpacity>
          <Text style={styles.heading}>List Assets</Text>
        </View>

        {/* List */}
        <FlatList
          data={assetList}
          renderItem={renderCard}
          keyExtractor={(i, e) => i.id}
        />

        {/* float btn */}
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => navigation.navigate('CreateAsset')}>
          <AntDesign name="plus" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgImg: {
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
  card: {
    width: '90%',
    height: scale(150),
    padding: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(12),
    marginVertical: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  floatBtn: {
    right: scale(10),
    width: scale(60),
    bottom: scale(10),
    height: scale(60),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(30),
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  assetImg: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'contain',
  },
});
