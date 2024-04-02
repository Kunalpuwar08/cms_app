import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {bg} from '../../../assets';
import CHeader from '../../../components/CHeader';
import CInput from '../../../components/CInput';
import CDropdown from '../../../components/CDropdown';
import CButton from '../../../components/CButton';
import {Colors} from '../../../utils/Colors';
import {Fonts} from '../../../utils/Fonts';
import {scale} from '../../../utils/Matrix';
import {useMutation} from '@tanstack/react-query';
import {updateTodoCall} from '../../../apis';
import Toast from 'react-native-toast-message';

const ViewTodo = () => {
  const route = useRoute();
  const item = route.params.item;
  const navigation = useNavigation();
  const statusTypes = [
    {label: 'todo', value: 'todo'},
    {label: 'In progress', value: 'In progress'},
    {label: 'Completed', value: 'Completed'},
  ];

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [status, setStatus] = useState(item.status);

  const updateTodoMutation = useMutation({
    mutationFn: updateTodoCall,
    onSuccess: data => {
      console.log('Succes Data :', data);
      Toast.show({
        type: 'success',
        text1: 'Todo updated Successfully',
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

  const onEdit = id => {
    const data = {title, description, status};
    updateTodoMutation.mutate({data, id});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bg} style={{flex: 1}}>
        <CHeader title={'Edit Todo'} />

        <Text style={styles.date}>Date: {item.date}</Text>
        <CInput
          label={'Enter Title'}
          value={title}
          onChangeText={val => setTitle(val)}
        />
        <CDropdown
          data={statusTypes}
          val={status}
          onValueChange={val => setStatus(val)}
        />
        <CInput
          label={'Enter Description'}
          onChangeText={txt => setDescription(txt)}
          multiline={true}
          numberOfLines={15}
          value={description}
          textAlignVertical={'top'}
        />

        <CButton
          name={'Edit'}
          otherStyle={{width: '90%', backgroundColor: Colors.purple}}
          onPress={() => onEdit(item._id)}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ViewTodo;

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
