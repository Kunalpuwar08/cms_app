import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors} from '../../../utils/Colors';
import {bg} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../../../utils/Matrix';
import {Fonts} from '../../../utils/Fonts';
import {useQuery} from '@tanstack/react-query';
import {listNotifications} from '../../../apis';

const Notification = () => {
  const navigation = useNavigation();
  const onBack = () => navigation.goBack();

  const notiQuery = useQuery({
    queryKey: ['noti'],
    queryFn: listNotifications,
  });

  const renderNoti = useCallback(({item, index}) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.body} numberOfLines={1}>
          {item?.body}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.imageContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack}>
            <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        {/*  */}
        <FlatList data={notiQuery.data?.data} renderItem={renderNoti} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(18),
    marginLeft: scale(12),
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    height: scale(60),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    marginVertical: scale(12),
    justifyContent: 'center',
    padding: scale(12),
  },
  title: {
    fontSize: scale(14),
    fontFamily: Fonts.AntaRegular,
    color: Colors.black,
  },
  body: {
    fontSize: scale(10),
    fontFamily: Fonts.AntaRegular,
    color: Colors.black,
  },
});
