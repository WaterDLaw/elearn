import React, { useEffect} from 'react'

import { View,Text } from 'react-native'


import { useDispatch, useSelector } from 'react-redux'
import { selectProfileName, showProfile, setActiveProfile } from '../../features/profile/profileSlice'

import { selectUserUid } from '../../features/user/userSlice'

import { Formik } from 'formik'

import firebase from 'firebase/app'
import "firebase/firestore";

const ShowProfileScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userId = useSelector(selectUserUid);
    const profileName = useSelector(selectProfileName)

    console.log(userId)

    useEffect(() => {

        // Get the Uid of the current user
        dispatch(
            showProfile(userId)
        )
    }, [dispatch])

    return (
        <View>
            <Text>{profileName}</Text>
        </View>
    )
}

export default ShowProfileScreen
