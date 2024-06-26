import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { scale } from '../utils/Matrix';
import { Colors } from '../utils/Colors';

const CButton = ({name, onPress,otherStyle}) => {
  return (
    <TouchableOpacity style={[styles.btn,otherStyle]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.btnTxt}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#027BFE',
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: Colors.white,
    textTransform: 'uppercase',
  },
});
