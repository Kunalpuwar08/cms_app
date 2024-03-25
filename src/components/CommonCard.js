import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {scale} from '../utils/Matrix';
import {Colors} from '../utils/Colors';
import {Fonts} from '../utils/Fonts';

const CommonCard = ({onPress, name,source}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={source} style={styles.avtar} />
      <Text style={styles.card_name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  card: {
    width: '40%',
    height: scale(160),
    alignItems: 'center',
    margin: scale(12),
    borderRadius: scale(8),
    paddingVertical: scale(12),
    backgroundColor: Colors.white,
  },
  avtar: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    borderRadius: scale(40),
    marginBottom: scale(12),
    resizeMode:'contain'
  },
  card_name: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
