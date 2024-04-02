import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../utils/Matrix';
import {Fonts} from '../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CHeader = ({title, isRight}) => {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
        <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
        <Text style={styles.headerTitle}>{title}</Text>
      </TouchableOpacity>
      {isRight && isRight}
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(18),
    marginLeft: scale(12),
  },
  backBtn: {flexDirection: 'row', alignItems: 'center'},
});
