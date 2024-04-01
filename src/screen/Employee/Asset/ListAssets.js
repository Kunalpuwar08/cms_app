import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {bg} from '../../../assets';
import CHeader from '../../../components/CHeader';
import {useQuery} from '@tanstack/react-query';
import {listAssetEmployee} from '../../../apis';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';

const ListAssets = () => {
  const [list, setList] = useState([]);

  const empAssetListQuery = useQuery({
    queryKey: ['empAssetList'],
    queryFn: listAssetEmployee,
  });

  useEffect(() => {
    setList(empAssetListQuery.data?.data?.assets);
  }, [empAssetListQuery.isLoading]);

  const renderCard = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Image source={{uri: item.imageUrl}} style={styles.img} />
        <View style={{width: '70%'}}>
          <Text>Name: {item.name}</Text>
          <Text>Desc: {item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.container} source={bg}>
        <CHeader title={'My Asset'} />

        <FlatList data={list} renderItem={renderCard} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: scale(150),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    marginVertical: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
  },
  img: {
    height: '80%',
    width: scale(100),
    resizeMode: 'contain',
  },
});
