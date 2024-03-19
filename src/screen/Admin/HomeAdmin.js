import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {bg, employeeImg} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeAdmin = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground source={bg} style={styles.container}>
      {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>CMS</Text>
          <View style={styles.headerBtnContainer}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="search-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardConatiner}>
          
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TimesheetList')}
              style={styles.card(Colors.white)}></TouchableOpacity>
            <Text style={styles.cardTxt}>Timesheet</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListEmp')}
              style={styles.card(Colors.white)}></TouchableOpacity>
            <Text style={styles.cardTxt}>Employee</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListAsset')}
              style={styles.card(Colors.white)}></TouchableOpacity>
            <Text style={styles.cardTxt}>Asset</Text>
          </View>

          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdminLeave')}
              style={styles.card(Colors.white)}></TouchableOpacity>
            <Text style={styles.cardTxt}>Leave</Text>
          </View>
        </View>

        {/*  */}
        <View style={styles.boxContainer}>
          <Image source={employeeImg} style={{width: '50%', height: '90%'}} />
          <View style={{width: '49%'}}>
            <Text style={styles.cardTitle}>Total Employees:</Text>
            <Text style={styles.cardTitle}>With Project: {0}</Text>
            <Text style={styles.cardTitle}>On Bench: {0}</Text>
          </View>
        </View>

        {/*  */}
        <View style={styles.boxContainer}>
          <View style={{width: '50%'}}>
            <Text style={styles.cardTitle}>Total Projects:</Text>
            <Text style={styles.cardTitle}>on going Project: {0}</Text>
            <Text style={styles.cardTitle}>finished project: {0}</Text>
          </View>
          <Image source={employeeImg} style={{width: '50%', height: '90%'}} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  main: {flex: 1},
  header: {
    padding: scale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  headerBtnContainer: {
    flexDirection: 'row',
  },
  headerBtn: {
    paddingHorizontal: scale(6),
  },
  cardConatiner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: scale(100),
    overflow: 'hidden',
  },
  cardWrapper: {
    padding: scale(12),
    alignItems: 'center',
    width: '25%',
  },
  card: color => ({
    elevation: 6,
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: color,
  }),
  cardTxt: {
    margin: scale(8),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(8),
  },
  boxContainer: {
    width: '90%',
    margin: scale(12),
    height: scale(150),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    padding: scale(8),
  },
  cardTitle: {
    color: Colors.blue,
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
  },
});
