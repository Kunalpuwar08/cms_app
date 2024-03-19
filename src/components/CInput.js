import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
// import {Fonts} from '../utils/Fonts';
import {Colors} from '../utils/Colors';
import { scale } from '../utils/Matrix';

const CInput = ({
  label,
  value,
  error,
  iconImg,
  disabled,
  multiline,
  errorText,
  showImage,
  otherStyle,
  onChangeText,
  numberOfLines,
  secureTextEntry,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        {...props}
        style={[styles.input, otherStyle]}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        underlineStyle={{display: 'none'}}
        disabled={disabled}
        numberOfLines={numberOfLines}
        multiline={multiline}
        textColor={Colors.black}
        autoCapitalize="none"
      />
      {showImage && (
        <Image
          size={24}
          source={iconImg}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            right: 12,
            bottom: 12,
          }}
        />
      )}
      <Text type="error" visible={error}>
        {errorText}
      </Text>
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    // alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomWidth: .5,
    padding:scale(12),
    borderRadius:scale(8)
    // fontFamily: Fonts.AntaRegular,
  },
});
