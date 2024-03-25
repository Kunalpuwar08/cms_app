import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { scale } from '../utils/Matrix';
import { Colors } from '../utils/Colors';

const CButton = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
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
