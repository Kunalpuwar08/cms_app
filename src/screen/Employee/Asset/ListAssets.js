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
import {Fonts} from '../../../utils/Fonts';

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
          <Text style={styles.name}>Name: {item.name}</Text>
          <Text style={styles.desc}>Desc: {item.description}</Text>
        </View>
      </View>
    );
  };

  const listEmptyCard = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTxt}>Asset List is Empty</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.container} source={bg}>
        <CHeader title={'My Asset'} />

        <FlatList
          data={list}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
          ListEmptyComponent={listEmptyCard}
        />
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
  name: {
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(12),
  },
  desc: {
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(14),
  },
  emptyContainer: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTxt: {
    fontFamily: Fonts.AntaRegular,
    color: Colors.white,
    fontSize: scale(18),
  },
});
