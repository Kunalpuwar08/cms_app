import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {bg} from '../../../assets';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {Colors} from '../../../utils/Colors';
import {useMutation, useQuery} from '@tanstack/react-query';
import CInput from '../../../components/CInput';
import {createTimesheet, listProjectEmpCall} from '../../../apis';
import React, {useEffect, useState} from 'react';
import CHeader from '../../../components/CHeader';
import CButton from '../../../components/CButton';
import CDropdown from '../../../components/CDropdown';
import {useNavigation} from '@react-navigation/native';

const CreateTimesheet = () => {
  const currentDate = moment(new Date()).format('l');
  const navigation = useNavigation();
  const [proList, setProList] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');

  const projectListQuery = useQuery({
    queryKey: ['projectList'],
    queryFn: listProjectEmpCall,
  });

  const createProjectMutation = useMutation({
    mutationFn: createTimesheet,
    onSuccess: data => {
      console.log('Succes Data :', data);
      Toast.show({
        type: 'success',
        text1: 'Timesheet Created Successfully',
      });
      navigation.goBack();
    },
    onError: err => {
      console.log(err.data, 'error in api call>>>>>>>>>>>');
      Toast.show({
        type: 'success',
        text1: err.message,
      });
    },
  });

  useEffect(() => {
    async function getListPro() {
      const list = await projectListQuery.data?.data?.projects.map(
        (item, index) => {
          return {label: item?.name, value: item?.name, data: item};
        },
      );

      setProList(list);
    }
    getListPro();
  }, [projectListQuery.isLoading]);

  const onSave = () => {
    const data = {
      projectId: selectedProject,
      date: currentDate,
      hours: hours,
      description: description,
    };
    console.log(data);
    createProjectMutation.mutate(data);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <CHeader title={'Create Timesheet'} />

        <Text style={styles.date}>Today's Date: {currentDate}</Text>

        <CDropdown
          placeholder={'Select Project'}
          data={proList || [{label: 'bench', value: 'bench'}]}
          onValueChange={txt => txt}
          setSelectedItem={val => setSelectedProject(val?.data?._id)}
        />
        <CInput label={'Hours'} onChangeText={txt => setHours(txt)} />
        <CInput
          label={'Description'}
          multiline={true}
          numberOfLines={6}
          textAlignVertical={'top'}
          onChangeText={txt => setDescription(txt)}
        />
        <CButton name={'Save'} otherStyle={{width: '90%'}} onPress={onSave} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateTimesheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  date: {
    width: '90%',
    alignSelf: 'center',
    fontSize: scale(20),
    fontFamily: Fonts.AntaRegular,
    color: Colors.white,
    marginVertical: scale(8),
  },
});
