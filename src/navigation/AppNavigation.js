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
import Profile from '../screen/Employee/Profile/Profile';
import Notification from '../screen/Admin/Notification/Notification';
import ListLeavesEmp from '../screen/Employee/Leave/ListLeavesEmp';
import TodoList from '../screen/Employee/Todo/TodoList';
import ListProject from '../screen/Employee/Project/ListProject';
import CreateProject from '../screen/Admin/Project/CreateProject';
import ListAssets from '../screen/Employee/Asset/ListAssets';
import CreateTimesheet from '../screen/Employee/Timesheet/CreateTimesheet';
import ListTimesheet from '../screen/Employee/Timesheet/ListTimesheet';
import ListAdminProjects from '../screen/Admin/Project/ListAdminProjects';
import CreateTodo from '../screen/Employee/Todo/CreateTodo';
import ViewTodo from '../screen/Employee/Todo/ViewTodo';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Auth' component={Auth} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} />
        <Stack.Screen name='AdminHome' component={HomeAdmin} />
        <Stack.Screen name='EmployeeHome' component={HomeEmp} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Notification' component={Notification} />
        {/* Todo */}
        <Stack.Screen name='TodoList' component={TodoList} />
        <Stack.Screen name='CreateTodo' component={CreateTodo} />
        <Stack.Screen name='ViewTodo' component={ViewTodo} />
        {/* Leave */}
        <Stack.Screen name='AdminLeave' component={AdminLeave} />
        <Stack.Screen name='EmployeeLeave' component={EmpLeave} />
        <Stack.Screen name='EmployeeLeaveList' component={ListLeavesEmp} />
        {/* Employee */}
        <Stack.Screen name='ListEmp' component={ListEmp} />
        <Stack.Screen name='CreateEmp' component={CreateEmp} />
        {/* Asset */}
        <Stack.Screen name='ListAsset' component={ListAsset} />
        <Stack.Screen name='CreateAsset' component={CreateAsset} />
        <Stack.Screen name='ListAssetEmp' component={ListAssets} />
        {/* Project */}
        <Stack.Screen name='ListAdminProject' component={ListAdminProjects} />
        <Stack.Screen name='ListProject' component={ListProject} />
        <Stack.Screen name='CreateProject' component={CreateProject} />
        {/* Timesheet */}
        <Stack.Screen name='CreateTimesheet' component={CreateTimesheet} />
        <Stack.Screen name='ListTimesheet' component={ListTimesheet} />

    </Stack.Navigator>
  )
}

export default AppNavigation