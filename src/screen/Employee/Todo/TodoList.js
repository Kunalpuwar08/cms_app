import {
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {bg} from '../../../assets';
import {listTodoCall} from '../../../apis';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import CHeader from '../../../components/CHeader';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TodoList = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  const empAssetListQuery = useQuery({
    queryKey: ['todoList'],
    queryFn: listTodoCall,
  });

  useEffect(() => {
    setList(empAssetListQuery.data?.data);
  }, [empAssetListQuery.isLoading]);

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        key={index}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ViewTodo', {item})}>
        <Text style={styles.title} numberOfLines={1}>
          {item.date}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.desc} numberOfLines={4}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.imageContainer}>
        <CHeader title={'Todo List'} />

        <FlatList
          data={list}
          renderItem={renderCard}
          numColumns={2}
          keyExtractor={(i, e) => e}
          contentContainerStyle={{width: '90%', alignSelf: 'center'}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />

        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => navigation.navigate('CreateTodo')}>
          <AntDesign name="plus" size={scale(20)} color={Colors.white} />
        </TouchableOpacity>
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
  floatBtn: {
    right: scale(10),
    width: scale(50),
    bottom: scale(10),
    height: scale(50),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  card: {
    width: '48%',
    height: 'auto',
    padding: scale(8),
    maxHeight: scale(150),
    borderRadius: scale(6),
    marginVertical: scale(8),
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.black,
    fontSize: scale(14),
    fontFamily: Fonts.AntaRegular,
  },
  desc: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
});
