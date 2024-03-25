import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {bg} from '../../../assets';
import {Colors} from '../../../utils/Colors';
import CHeader from '../../../components/CHeader';

const {width} = Dimensions.get('window');

const TodoList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.imageContainer}>
        <CHeader title={'Todo List'} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
});
