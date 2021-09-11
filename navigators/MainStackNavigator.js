import React from 'react'
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import ShowProfileScreen from '../screens/Profile/ShowProfileScreen';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import TopicScreen from '../screens/TopicScreen';

const Tab = createBottomTabNavigator();

const changeHeaderOptions = (route) =>{
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Index';

  if(routeName == 'Show'){
    console.log(routeName)
    return false
  }else{
    console.log(routeName)
    return true
  }

}

const style = {
  title: 'My home',
  headerStyle: {
    backgroundColor: '#1273de',
  
    
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

// Default Theme for MainNavigation
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const MainStackNavigator = () => {
    return (
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  // Icons for the bottom navigation
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Learn') {
                      iconName = focused ? 'school' : 'school-outline'
                    } else if (route.name === 'Profile'){
                      iconName = focused ? 'person' : 'person-outline'
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                  // Style the header
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
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={HomeScreen} />
          <Tab.Screen name="Learn" component={TopicScreen} 
            options= {({route}) =>({
              headerShown: changeHeaderOptions(route)
            })}
          
          />
          <Tab.Screen name="Profile" component={ShowProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      );
}

export default MainStackNavigator
