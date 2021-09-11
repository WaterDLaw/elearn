import 'react-native-gesture-handler';

import React from 'react';


import { createStackNavigator } from '@react-navigation/stack';

import CreateTopicScreen from '../screens/Topics/CreateTopicScreen';

import EditTopicScreen from '../screens/Topics/EditTopicScreen';
import IndexTopicScreen from '../screens/Topics/IndexTopicScreen';
import TopicShowTopTabNavigator from './TopicShowTopTabNavigator';




const TopicStack = createStackNavigator();

export function TopicStackkNavigator() {
  return (

      <TopicStack.Navigator
      screenOptions={() => ({
     
        headerStyle: {
          backgroundColor: '#1273DE',
          height: 40,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          
        },
      })}
      >
        <TopicStack.Screen name={'IndexTopic'} options={{headerShown: false}} component={IndexTopicScreen}/>
        <TopicStack.Screen name={'CreateTopic'} component={CreateTopicScreen}/>
        <TopicStack.Screen /*options={{headerShown: false}}*/ name={'ShowTopic'} component={TopicShowTopTabNavigator}/>
        <TopicStack.Screen name={'EditTopic'} component={EditTopicScreen}/>
      </TopicStack.Navigator>

    
  );

}