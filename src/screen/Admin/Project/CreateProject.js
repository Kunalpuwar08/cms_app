import {
  View,
  Text,
  FlatList,
  ScrollView,
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
import CInput from '../../../components/CInput';
import React, {useEffect, useState} from 'react';
import CHeader from '../../../components/CHeader';
import CButton from '../../../components/CButton';
import CDropdown from '../../../components/CDropdown';
import {useNavigation} from '@react-navigation/native';
import CDatePicker from '../../../components/CDatePicker';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useMutation, useQuery} from '@tanstack/react-query';
import {createProjectCall, listEmpName} from '../../../apis';
import Toast from 'react-native-toast-message';

const CreateProject = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [assignTo, setAssignTo] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [empNameData, setEmpNameData] = useState([]);

  const empListQuery = useQuery({
    queryKey: ['empList'],
    queryFn: listEmpName,
  });

  const createProjectMutation = useMutation({
    mutationFn: createProjectCall,
    onSuccess: data => {
      console.log('Succes Data :', data);
      Toast.show({
        type:'success',
        text1:'Project Created Successfully'
      })
      navigation.goBack();
    },
    onError: err => {
      console.log(err.data, 'error in api call>>>>>>>>>>>');
    },
  });

  const typeData = [
    {
      label: 'web development',
      value: 'web development',
    },
    {
      label: 'app developmet',
      value: 'app developmet',
    },
    {
      label: 'web design',
      value: 'web design',
    },
    {
      label: 'ui/ux',
      value: 'ui/ux',
    },
    {
      label: 'backend development',
      value: 'backend development',
    },
    {
      label: 'testing',
      value: 'testing',
    },
    {
      label: 'publishing',
      value: 'publishing',
    },
  ];

  const statusData = [
    {label: 'upcoming', value: 'upcoming'},
    {label: 'process', value: 'process'},
    {label: 'completed', value: 'completed'},
  ];

  const priorityData = [
    {label: 'Highest', value: 'Highest'},
    {label: 'High', value: 'High'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Low', value: 'Low'},
    {label: 'Lowest', value: 'Lowest'},
  ];

  useEffect(() => {
    async function getEmpName() {
      const emp = await empListQuery.data?.data.map(item => {
        return {label: item.name, value: item.name};
      });

      setEmpNameData(emp || []);
    }
    getEmpName();
  }, [empListQuery.isLoading]);

  const pickDocument = async () => {
    // return;
    if (DocumentPicker && DocumentPicker.pick) {
      try {
        const res = await DocumentPicker.pick({
          allowMultiSelection: true,
          type: [DocumentPicker.types.allFiles],
        });
        console.log(res, 'res');
        setSelectedFiles(res);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          console.log('Error occurred:', err);
        }
      }
    } else {
      console.error('DocumentPicker is not available');
    }
  };

  const onCreateProject = async () => {
    const todayDate = moment(new Date()).format('ll');
    const deadlineDate = moment(endDate).format('ll');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('createdDate',todayDate);
    formData.append('deadlineDate', deadlineDate);

    formData.append('status', status);
    formData.append('priority', priority);
    formData.append('assignTo', assignTo);

    selectedFiles.forEach(file => {
      formData.append('files', []);
    });

    createProjectMutation.mutate(formData);
  };

  const renderFiles = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.fileView}>
        <Text numberOfLines={1}>Name : {item.name}</Text>
        <Text>size : {item.size}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={styles.container}>
        <CHeader title={'Create Project'} />

        <ScrollView style={{marginTop: scale(12)}}>
          <CInput
            otherStyle={styles.input}
            label={'Project Name'}
            onChangeText={txt => setName(txt)}
          />

          <CInput
            otherStyle={styles.input}
            label={'Project Description'}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={'top'}
            onChangeText={txt => setDescription(txt)}
          />

          <CDropdown
            placeholder={'Select Type'}
            label={'Select Type'}
            data={typeData}
            onValueChange={txt => setType(txt)}
          />

          <CDatePicker
            placeholder={'Select Deadline Date'}
            onDateSelect={val => setEndDate(val)}
          />

          <CDropdown
            placeholder={'Select Status'}
            label={'Select Status'}
            data={statusData}
            onValueChange={txt => setStatus(txt)}
          />

          <CDropdown
            placeholder={'Select Priority'}
            label={'Select Priority'}
            data={priorityData}
            onValueChange={txt => setPriority(txt)}
          />

          <CDropdown
            placeholder={'Assign To'}
            label={'Select Employee'}
            data={empNameData}
            onValueChange={txt => setAssignTo(txt)}
          />

          <View style={{alignSelf: 'center', width: '90%'}}>
            {selectedFiles.length == 0 ? (
              <>
                <Text style={styles.uploadTxt}>Add Files</Text>
                <TouchableOpacity style={styles.plusBtn} onPress={pickDocument}>
                  <AntDesign
                    name="plus"
                    color={Colors.white}
                    size={scale(18)}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <FlatList
                data={selectedFiles}
                renderItem={renderFiles}
                keyExtractor={i => i.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>

          <CButton
            name={'Create Project'}
            onPress={() => onCreateProject()}
            otherStyle={{width: '90%'}}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    width: '100%',
  },
  createBtn: {
    width: '90%',
    height: scale(40),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    marginVertical: scale(8),
  },
  createBtnTxt: {
    color: Colors.white,
    fontSize: scale(18),
    fontFamily: Fonts.AntaRegular,
  },
  plusBtn: {
    width: scale(40),
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(5),
    justifyContent: 'center',
    backgroundColor: Colors.grey,
  },
  uploadTxt: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginVertical: scale(8),
  },
  fileView: {
    height: 100,
    width: 100,
    borderRadius: 12,
    backgroundColor: Colors.white,
    margin: 8,
  },
});
