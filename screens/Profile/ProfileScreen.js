import React, { useEffect} from 'react'

import { View,Text } from 'react-native'


import { useDispatch, useSelector } from 'react-redux'
import { selectProfileName, showProfile, setActiveProfile } from '../../features/profile/profileSlice'

import { selectUserUid } from '../../features/user/userSlice'

import { Formik } from 'formik'
import CreateProfileScreen from './CreateProfileScreen';
import ShowProfileScreen from './ShowProfileScreen';
import firebase from 'firebase/app'
import "firebase/firestore";

const ProfileScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserUid);
    const profileName = useSelector(selectProfileName)
    let profile= null;

    console.log(userId)

    useEffect(() => {

        // Get the Uid of the current user
        dispatch(
            showProfile(userId)
        )
        firebase.firestore().collection("Users").doc(userId)
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            profile = doc.data()
            dispatch(
                setActiveProfile(doc.data())
            )
        });
    })

    if(profile==null){
        return(
            <CreateProfileScreen/>
        )
     
    }
    return (
        <ShowProfileScreen/>
    )
}

export default ProfileScreen
