import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Toast from 'react-native-toast-message';
import {UserAuthContext} from '../../../context/authContext';
import {bg} from '../../../assets';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import CInput from '../../../components/CInput';
import httpService from '../../../utils/https';

const CreateAsset = () => {
  const navigation = useNavigation();

  const useUserAuthContext = () => useContext(UserAuthContext);
  const {token} = useUserAuthContext();

  const [imgObj, setImgObj] = useState();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.6,
        cameraType: 'back',
        saveToPhotos: true,
      },
      res => {
        if (!res.didCancel && !res.errorCode) {
          setImgObj(res);
          console.log(res);
        }
      },
    );
  };

  const onCreateAsset = async () => {
    if (!name || !type || !brand || !description || !imgObj) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all fields',
      });
      return;
    }
    try {
      const imageUrl = imgObj.assets[0].uri;
      const imageType = imgObj.assets[0].type;
      const imageName = imgObj.assets[0].fileName;

      const formData = new FormData();
      formData.append('image', {
        uri: imageUrl,
        type: imageType,
        name: imageName,
      });
      formData.append('name', name);
      formData.append('type', type);
      formData.append('brand', brand);
      formData.append('description', description);

      const res = await httpService({
        method: 'post',
        url: '/asset/create',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log(res.data, 'Data>>>>>>>>>>>>>>>>>>>');

      Toast.show({
        type: 'success',
        text1: 'Asset created successfully',
      });
      goBack()
    } catch (error) {
      console.error('Error creating asset:', error);

      Toast.show({
        type: 'error',
        text1: 'Error creating asset',
        text2: error.message,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftBtn} onPress={goBack}>
            <AntDesign name="left" color={Colors.white} size={scale(18)} />
          </TouchableOpacity>
          <Text style={styles.heading}>Create Assets</Text>
        </View>

        <ScrollView style={styles.wrapper}>
          <TouchableOpacity style={styles.profileImg} onPress={openCamera}>
            {imgObj?.assets[0] == null ? (
              <FontAwesome name="file-image-o" size={scale(26)} />
            ) : (
              <Image
                source={{uri: imgObj?.assets[0].uri}}
                style={styles.profileImg}
              />
            )}
          </TouchableOpacity>
          <CInput
            placeholder={'Name'}
            otherStyle={styles.input}
            onChangeText={txt => setName(txt)}
          />
          <CInput
            label={'Brand'}
            otherStyle={styles.input}
            onChangeText={txt => setBrand(txt)}
          />
          <CInput
            label={'Type'}
            otherStyle={styles.input}
            onChangeText={txt => setType(txt)}
          />
          <CInput
            label={'Description'}
            otherStyle={styles.input}
            onChangeText={txt => setDescription(txt)}
          />

          <TouchableOpacity style={styles.btn} onPress={onCreateAsset}>
            <Text style={styles.btnTxt}>Add Asset</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
  },
  heading: {
    fontSize: scale(18),
    color: Colors.white,
    fontWeight: 'bold',
  },
  leftBtn: {
    marginHorizontal: scale(12),
  },
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    alignSelf: 'center',
  },
  profileImg: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginVertical: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '80%',
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#027BFE',
    alignSelf: 'center',
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: Colors.white,
    textTransform: 'uppercase',
  },
});
