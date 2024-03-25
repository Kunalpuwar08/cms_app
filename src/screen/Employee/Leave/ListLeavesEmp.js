import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {emplistLeaves} from '../../../apis';
import {useQuery} from '@tanstack/react-query';
import {bg} from '../../../assets';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import {Fonts} from '../../../utils/Fonts';

const ListLeavesEmp = () => {
  const emplistQuery = useQuery({
    queryKey: ['emplistLeave'],
    queryFn: emplistLeaves,
  });

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor:
                item.status == 'approve'
                  ? Colors.green
                  : item.status == 'reject'
                  ? Colors.red
                  : Colors.yellow,
              marginRight: scale(6),
            }}
          />
          <Text style={styles.status}>{item?.status}</Text>
        </View>
        <Text style={{color: Colors.black}}>
          {moment(item.startDate).format('L')} -{' '}
          {moment(item.endDate).format('L')}
        </Text>
        <Text style={{color: Colors.black}}>{item.reason}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={{flex: 1}}>
        <Text style={styles.title}>History</Text>
        <FlatList
          data={emplistQuery.data?.data}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListLeavesEmp;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    height: scale(100),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    padding: scale(8),
    margin: scale(12),
  },
  status: {
    color: Colors.black,
    textTransform: 'capitalize',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginVertical: scale(18),
  },
});
