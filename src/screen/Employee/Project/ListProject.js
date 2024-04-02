import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {bg} from '../../../assets';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/Colors';
import CHeader from '../../../components/CHeader';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../../utils/Matrix';
import {Fonts} from '../../../utils/Fonts';
import {useQuery} from '@tanstack/react-query';
import {projectListEmpCall} from '../../../apis';
import moment from 'moment';

const ListProject = () => {
  const navigation = useNavigation();
  const [listData, setListData] = useState([]);

  const adminListQuery = useQuery({
    queryKey: ['empProjectList'],
    queryFn: projectListEmpCall,
  });

  useEffect(() => {
    setListData(adminListQuery.data?.data?.projects);
  }, [adminListQuery?.isLoading]);

  const onCardPress = item => {};

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        key={index}
        onPress={() => onCardPress(item)}>
        <View>
          <Text style={styles.cardDate} numberOfLines={1}>
            {item._id}
          </Text>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
          <Text style={styles.cardDate}>
            {moment(item.createdDate).format('l')} -{' '}
            {moment(item.deadlineDate).format('l')}
          </Text>
          <Text style={styles.cardPriority}>Priority - {item.priority}</Text>
          <Text style={styles.cardDate}>
            Attachment - {item?.files?.length}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const listEmptyCard = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts.AntaRegular,
            color: Colors.white,
            fontSize: scale(18),
          }}>
          Project Section is Empty
        </Text>
      </View>
    );
  };

  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <CHeader title={'List Project'} />
        <View>
          <FlatList
            data={listData}
            renderItem={renderCard}
            keyExtractor={i => i.id}
            ListEmptyComponent={listEmptyCard}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.white,
    fontSize: scale(20),
    fontFamily: Fonts.AntaRegular,
  },
  card: {
    width: '90%',
    padding: scale(8),
    height: scale(120),
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    marginVertical: scale(8),
  },
  cardTitle: {
    color: Colors.black,
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
  },
  cardDesc: {
    color: Colors.blue,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  cardDate: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  cardPriority: {
    color: Colors.blue,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  floatBtn: {
    width: scale(50),
    right: scale(10),
    bottom: scale(10),
    height: scale(50),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(25),
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
});
