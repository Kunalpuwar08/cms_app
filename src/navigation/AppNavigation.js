import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screen/Auth';
import SplashScreen from '../screen/SplashScreen';
import HomeAdmin from '../screen/Admin/HomeAdmin';
import HomeEmp from '../screen/Employee/HomeEmp';
import ChangePassword from '../screen/ChangePassword';
import EmpLeave from '../screen/Employee/Leave/EmpLeave';
import AdminLeave from '../screen/Admin/Leave/AdminLeave';
import ListEmp from '../screen/Admin/Emp/ListEmp';
import CreateEmp from '../screen/Admin/Emp/CreateEmp';
import CreateAsset from '../screen/Admin/Asset/CreateAsset';
import ListAsset from '../screen/Admin/Asset/ListAsset';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Auth' component={Auth} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='AdminHome' component={HomeAdmin} />
        <Stack.Screen name='EmployeeHome' component={HomeEmp} />
        {/* Leave */}
        <Stack.Screen name='AdminLeave' component={AdminLeave} />
        <Stack.Screen name='EmployeeLeave' component={EmpLeave} />
        {/* Employee */}
        <Stack.Screen name='ListEmp' component={ListEmp} />
        <Stack.Screen name='CreateEmp' component={CreateEmp} />
        {/* Asset */}
        <Stack.Screen name='ListAsset' component={ListAsset} />
        <Stack.Screen name='CreateAsset' component={CreateAsset} />

    </Stack.Navigator>
  )
}

export default AppNavigation