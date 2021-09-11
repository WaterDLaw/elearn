import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ShowProfileScreen from '../screens/Profile/ShowProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import CreateProfileScreen from '../screens/Profile/CreateProfileScreen';


const ProfileStack = createStackNavigator();

export function ProfileStackNavigator() {
  return (

      <ProfileStack.Navigator>
        <ProfileStack.Screen name={'Show'} component={ShowProfileScreen}/>
        <ProfileStack.Screen name={'Edit'} component={EditProfileScreen}/>
      </ProfileStack.Navigator>

    
  );

}