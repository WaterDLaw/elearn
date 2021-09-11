import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
  return (

      <AuthStack.Navigator
      
      >
        <AuthStack.Screen options={{headerShown: false}} name={'Welcome'} component={WelcomeScreen}/>
        <AuthStack.Screen options={{headerShown: false}} name={'Login'} component={LoginScreen}/>
        <AuthStack.Screen options={{headerShown: false}} name={'Signup'} component={SignupScreen}/>
      </AuthStack.Navigator>
 
    
  );

}