import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import { bg } from '../../../assets';
import { scale } from '../../../utils/Matrix';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import httpService from '../../../utils/https';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CDropdown from '../../../components/CDropdown';
import { assignAssetTo, listAssetAdmin, listEmpName } from '../../../apis';
import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const ListAsset = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    assetList: [],
    empNameData: [],
    isOpen: false,
    selectedAsset: null,
  });

  const empListQuery = useQuery({
    queryKey: ['empList'],
    queryFn: listEmpName,
  });

  const assetListQuery = useQuery({
    queryKey: ['assetList'],
    queryFn: listAssetAdmin,
  });

  const assignAssetMutation = useMutation({
    mutationFn: assignAssetTo,
    onSuccess: data => {
      setState(prevState => ({
        ...prevState,
        isOpen: false,
        selectedAsset: null,
      }));
      Toast.show({
        type: 'success',
        text1: 'Asset assign successfully',
      });
      assetListQuery.refetch();
    },
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      assetList: assetListQuery.data?.data?.assignedAssets || [],
    }));
  }, [assetListQuery.isLoading]);

  useEffect(() => {
    async function getEmpName() {
      const emp = await empListQuery.data?.data.map(item => ({
        label: item.name,
        value: item.name,
        userId: item?._id,
      }));
      setState(prevState => ({
        ...prevState,
        empNameData: emp || [],
      }));
    }
    getEmpName();
  }, [empListQuery.isLoading]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.card} 
        key={index} 
        onPress={() => setState(prevState => ({
          ...prevState,
          isOpen: true,
          selectedAsset: item,
        }))}>
        <Image source={{ uri: item.imageUrl }} style={styles.assetImg} />
        <View style={{ width: '55%' }}>
          <Text style={styles.txt} numberOfLines={1}>Name: {item.name}</Text>
          <Text style={styles.txt}>Desc: {item.description}</Text>
          <Text style={styles.txt}>Brand: {item.brand}</Text>
          {item.assignTo == null && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setState(prevState => ({
                  ...prevState,
                  isOpen: true,
                  selectedAsset: item,
                }));
              }}>
              <Text style={styles.btnTxt}>Assign asset</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const assignAsset = val => {
    const data = {
      assetId: state.selectedAsset?._id,
      userId: val?.userId,
      userName: val?.value,
    };
    assignAssetMutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.bgImg}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftBtn} onPress={goBack}>
            <AntDesign name="left" color={Colors.white} size={scale(18)} />
          </TouchableOpacity>
          <Text style={styles.heading}>List Assets</Text>
        </View>

        <FlatList
          data={state.assetList}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => navigation.navigate('CreateAsset')}>
          <AntDesign name="plus" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>

        <Modal transparent visible={state.isOpen}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Assign Asset To Employee
              </Text>
              <CDropdown
                data={state.empNameData}
                onValueChange={val => val}
                setSelectedItem={val => assignAsset(val)}
              />

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setState(prevState => ({
                  ...prevState,
                  isOpen: false,
                  selectedAsset: null,
                }))}>
                <AntDesign name="close" size={scale(20)} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgImg: {
    flex: 1,
  },
  header: {
    height: scale(60),
    padding: scale(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: scale(18),
    color: Colors.white,
  },
  leftBtn: {
    marginHorizontal: scale(12),
  },
  card: {
    width: '90%',
    height: scale(150),
    padding: scale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(12),
    marginVertical: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  floatBtn: {
    right: scale(10),
    width: scale(60),
    bottom: scale(10),
    height: scale(60),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(30),
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  assetImg: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'contain',
  },
  txt: {
    color: Colors.black,
    fontSize: scale(12),
    lineHeight: scale(22),
    fontFamily: Fonts.AntaRegular,
  },
  btn: {
    width: '80%',
    height: scale(25),
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(4),
  },
  btnTxt: {
    color: Colors.white,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    height: scale(250),
    width: '90%',
    backgroundColor: Colors.white,
  },
  closeBtn: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.grey,
    position: 'absolute',
    right: scale(-15),
    top: scale(-15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
