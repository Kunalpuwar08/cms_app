import {Fonts} from '../utils/Fonts';
import React, {useState} from 'react';
import {scale} from '../utils/Matrix';
import {Colors} from '../utils/Colors';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CDropdown = ({data, placeholder, onValueChange, otherStyle,setSelectedItem,val}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}, otherStyle]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTxt}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={scale(200)}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={val ? val :value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onValueChange(item.value);
          setSelectedItem && setSelectedItem(item)
        }}
      />
    </View>
  );
};

export default CDropdown;

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
    width:'100%'
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 0.5,
    height: scale(50),
    color: Colors.black,
    borderColor: Colors.grey,
    paddingHorizontal: scale(8),
    backgroundColor: Colors.white,
    width:'100%'
  },
  icon: {
    marginRight: scale(5),
  },
  label: {
    top: 8,
    left: 22,
    zIndex: 999,
    fontSize: scale(14),
    position: 'absolute',
    paddingHorizontal: scale(8),
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontSize: scale(14),
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: scale(14),
    color: Colors.black,
    textTransform: 'capitalize',
  },
  iconStyle: {
    width: scale(20),
    height: scale(20),
  },
  inputSearchStyle: {
    height: scale(40),
    fontSize: scale(16),
  },
  itemTxt: {
    color: Colors.black,
    fontSize: scale(13),
    fontFamily: Fonts.AntaRegular,
  },
});
