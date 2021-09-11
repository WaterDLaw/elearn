import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { setUserLogoutState } from '../features/user/userSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/app';

const HomeScreen = ()=> {

    const dispatch = useDispatch();

    const  logout = () =>{
        console.log("logout")
        firebase.auth().signOut()
            .then(data => {
                console.log(data),
                dispatch(setUserLogoutState())
            }).catch((error) =>{
                console.log(error)
            })
        
    }

    useEffect(() => {

        // If there was no profile for this user yet we have to create the profile with the uid
        // Later this will replaced with a more detailed profile
   
    });

    return(

            <View>
                <Text>Home Screen</Text>
                <Button title="Logout" onPress={logout} />
            </View>
   
    )
}


export default HomeScreen;