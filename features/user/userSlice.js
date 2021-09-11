import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app';

const initialState = {
    userEmail: null,
    userUid: null,

}

// Action Creators
export const loginUser = createAsyncThunk('user/loginUser',
    async ({email, password}) =>{
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)

            return response.user
        } catch (error) {
            console.log(error)
        }
    }
)

export const createUser = createAsyncThunk('user/createUser',
    async ({email, password}) => {
        console.log(email,password)
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            //returns a 
            console.log(response)
            return response.user
        } catch (error) {
            console.log(error)
        }
    })

export const logoutUser = createAsyncThunk('user/logoutUser',
    async ()=>{

    })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            console.log(action)
            state.userEmail = action.payload.email
            state.userUid = action.payload.uid
        },
        setUserLogoutState: (state) => {
            state.userEmail = null
            state.userUid = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) =>{
         
            state.userEmail = action.payload.email
            state.userUid = action.payload.uid

        }),
        builder.addCase(createUser.fulfilled, (state, action) =>{
            console.log(action)
            console.log(action.payload)
            console.log(action.payload.email)
            state.userEmail = action.payload.email
            state.userUid = action.payload.uid
    
            
        })
    }
})




// Export the actions
export const { setActiveUser, setUserLogoutState } = userSlice.actions

// to get the values
export const selectUserEmail = state => state.user.userEmail
export const selectUserUid = state => state.user.userUid

export default userSlice.reducer