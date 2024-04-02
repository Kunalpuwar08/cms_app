import React from 'react';
import {Fonts} from '../utils/Fonts';
import {scale} from '../utils/Matrix';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

const CHeaderCard = ({name, navigate, source}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    activeOpacity={0.8}
      style={styles.cardWrapper}
      onPress={() => navigation.navigate(navigate)}>
      {source && <Image source={source} style={styles.card} />}
      <Text style={styles.cardTxt}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CHeaderCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: '25%',
    padding: scale(12),
    alignItems: 'center',
  },
  card: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
  },
  cardTxt: {
    margin: scale(8),
    fontSize: scale(8),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
});
