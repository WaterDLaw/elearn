import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import firebase from 'firebase/app'
import "firebase/firestore";


const initialState = {
    name: null,
    age: null
}

// All the CRUD async actions for firebase

// Update a current profile
export const updateProfile = createAsyncThunk('profile/updateProfile',
    async () =>{
        try {
  

        } catch (error) {

        }
    }
)

// Create a profile (An empty profile will be create once a user registers)
export const createProfile = createAsyncThunk('profile/createProfile',
    async ({uid, name, age}) =>{
        const db = firebase.firestore();

        console.log("create Profile")
        try {
            const response = await db
                .collection('Users')
                .doc(uid)
                .set({
                    name: name,
                    age: age
                }).
                then((data) => {
                    console.log(data)
                })
                console.log(response)
                return response
        } catch (error) {
            console.log(error)
        }
        
    }
)

// Show the profile - Get infromation from the API
// Returns the Profile Doc with the UID if it exist, and a string "error" if not
export const showProfile = createAsyncThunk('profile/showProfile',
    async (uid) =>{
        try {
            const db = firebase.firestore();
            console.log("show Profile")
            console.log(uid)
            const response = await db
                .collection("Users")
                .doc(uid)
                .get()
                .then((doc)=>{
                    if(doc.exists){
                        console.log("Profile exists")
                        console.log(doc.data())
                        return doc.data()
                    }
                    else {
                        console.log("Profile does not exist")
                        return "error"
                    }
                }).catch((error) => {
                    console.log(error)
                })
                return response
        } catch (error) {
            console.log(error)
            return error
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setActiveProfile: (state, action) => {
            console.log(action)
            state.name = action.payload.name
            state.age = action.payload.age
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.fulfilled, (state, action) =>{

        }),
        builder.addCase(createProfile.fulfilled, (state, action) =>{
            console.log(action)
            //For now this will just return null
            state.name = null,
            state.age = null
        }),
        builder.addCase(showProfile.fulfilled, (state, action) =>{
            console.log(action)
            state.name = action.payload.name,
            state.age = action.payload.age
        })
    }

})

// Export the actions
export const { setActiveProfile} = profileSlice.actions

// Export the state variable
export const selectProfileName = state => state.profile.name
export const selectProfileAge = state => state.profile.age

export default profileSlice.reducer