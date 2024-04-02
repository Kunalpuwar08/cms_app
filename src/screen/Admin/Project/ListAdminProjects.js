import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {bg} from '../../../assets';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import CHeader from '../../../components/CHeader';
import {projectListAdminCall} from '../../../apis';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListAdminProjects = () => {
  const navigation = useNavigation();
  const [listProject, setListProject] = useState([]);

  const adminListQuery = useQuery({
    queryKey: ['adminProjectList'],
    queryFn: projectListAdminCall,
  });

  useEffect(() => {
    async function getListProject() {
      setListProject(adminListQuery.data?.data?.projects);
    }
    getListProject();
  }, [adminListQuery.isLoading]);

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card} key={index} activeOpacity={0.8}>
        <View>
          <Text style={styles.heading}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.description}>
              {moment(item.createdDate).format('l')} -{' '}
            </Text>
            <Text style={styles.description}>
              {moment(item.deadlineDate).format('l')}
            </Text>
          </View>
          <Text style={styles.description}>assignTo: {item.assignTo}</Text>
          <Text style={styles.description}>priority: {item.priority}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <CHeader title={'List Project'} />

        <FlatList
          data={listProject}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
        />

        <TouchableOpacity
          style={styles.floatBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CreateProject')}>
          <AntDesign name="plus" color={Colors.white} size={scale(20)} />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ListAdminProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  floatBtn: {
    right: scale(15),
    width: scale(50),
    bottom: scale(20),
    height: scale(50),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(25),
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  card: {
    width: '90%',
    margin: scale(9),
    padding: scale(9),
    height: scale(120),
    alignSelf: 'center',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
  description: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
});
