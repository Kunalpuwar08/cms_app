import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {bg} from '../../../assets';
import CHeader from '../../../components/CHeader';
import CInput from '../../../components/CInput';
import CButton from '../../../components/CButton';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import {scale} from '../../../utils/Matrix';
import {Fonts} from '../../../utils/Fonts';
import CDropdown from '../../../components/CDropdown';
import {useMutation} from '@tanstack/react-query';
import {createTodo} from '../../../apis';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const CreateTodo = () => {
  const currentDate = moment(new Date()).format('l');
  const navigation = useNavigation();
  const statusTypes = [
    {label: 'todo', value: 'todo'},
    {label: 'In progress', value: 'In progress'},
    {label: 'Completed', value: 'Completed'},
  ];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: data => {
      console.log('Succes Data :', data);
      Toast.show({
        type: 'success',
        text1: 'Todo Created Successfully',
      });
      navigation.goBack();
    },
    onError: err => {
      console.log(err.data, 'error in api call>>>>>>>>>>>');
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    },
  });

  const onSave = () => {
    const data = {title, date: currentDate, description, status};
    createTodoMutation.mutate(data);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={{flex: 1}}>
        <CHeader title={'create todo'} />

        <Text style={styles.date}>Date: {currentDate}</Text>
        <CInput label={'Enter Title'} onChangeText={val => setTitle(val)} />
        <CDropdown data={statusTypes} onValueChange={val => setStatus(val)} />
        <CInput
          label={'Enter Description'}
          onChangeText={txt => setDescription(txt)}
          multiline={true}
          numberOfLines={15}
          textAlignVertical={'top'}
        />

        <CButton
          name={'Save'}
          otherStyle={{width: '90%', backgroundColor: Colors.purple}}
          onPress={onSave}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  date: {
    width: '90%',
    alignSelf: 'center',
    margin: scale(12),
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
    color: Colors.white,
  },
});
