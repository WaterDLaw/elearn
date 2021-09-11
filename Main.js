import React, {useEffect} from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';

//screens
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import MainStackNavigator from './navigators/MainStackNavigator';
import { selectUserEmail, selectUserUid, setActiveUser } from './features/user/userSlice';
import CreateProfileScreen from './screens/Profile/CreateProfileScreen';
import { selectProfileName } from './features/profile/profileSlice';
import { showProfile } from './features/profile/profileSlice';

const RootStack = createStackNavigator();

const  Main = () => {

    const dispatch = useDispatch();
    const userUid = useSelector(selectUserUid)
    const profileNmae = useSelector(selectProfileName)

    const onAuthStateChanged = (user) => {

        if(!user==null){
            dispatch(
                setActiveUser({
                    email: user.email,
                    uid: user.uid
                })
            
            )
        }

    }

    useEffect(() =>{
        console.log("INSIDE MAIN")
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

        if(userUid){
            dispatch(
                showProfile(userUid)
            )
    
        }
        console.log(profileNmae)
        return subscriber; // unsubscribe on unmount
    })

    if(!userUid){
        return (
        
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{
                    headerShown: false,
                    }}>
                    <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>
                </RootStack.Navigator>
            </NavigationContainer>
    
        )
    }else{
        if(!profileNmae){
            return(
                <CreateProfileScreen/>
            )
       
        }else{
            return( 
                <MainStackNavigator/>
            )
        }

    }




    
}

export default Main