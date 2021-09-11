import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowTopicScreen from '../screens/Topics/ShowTopicScreen';
import ShowTopicMemberScreen from '../screens/Topics/ShowTopicMemberScreen';


const Tab = createMaterialTopTabNavigator();

const TopicShowTopTabNavigator = () => {
  return (

    <Tab.Navigator>
        <Tab.Screen name="Topic" component={ShowTopicScreen} />
        <Tab.Screen name="Member" component={ShowTopicMemberScreen} />
    </Tab.Navigator>
    
  );

}

export default TopicShowTopTabNavigator