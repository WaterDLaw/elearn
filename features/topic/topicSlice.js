import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import firebase from 'firebase/app'
import "firebase/firestore";

// The initial state will be an empty array
// A topic consist of:
// Title
// Subject
// Sub-subject
// description (optional)
const initialState = {
    topics: []
}

// All the CRUD async actions for firebase

// Update a current profile
export const updateTopic = createAsyncThunk('topic/updateTopic',
    async ({title, subject, subsubject, description, uid, id}) =>{
        try {
            const response = await firebase.firestore().collection("Users").doc(uid).collection("Topics")
                .doc(id)
                .update({
                    titel: title,
                    subject: subject,
                    subsubject: subsubject,
                    description: description
                }).then(doc => {
                    console.log(doc)
                    return {title: title, subject:subject,subsubject:subsubject,description:description, id: id}
                })
            return response
        } catch (error) {
            console.log(error)
        }
    }
)

// Create a Topic in the user (An empty profile will be create once a user registers)
export const createTopic = createAsyncThunk('topic/createTopic',
    async ({title, subject, subsubject, description, uid}) =>{
        try{
            console.log(uid)     
            const response = await firebase.firestore().collection("Users").doc(uid).collection("Topics")
                .add({  
                    title: title,
                    subject: subject,
                    subsubject: subsubject,
                    description: description
                }).then((doc) => {
                    // Return the payload with the data to + the id
                    return  {title: title, subject:subject,subsubject:subsubject,description:description, id: doc.id} 
                })
            return response
        } catch (error) {
            console.log(error)
        }
    }
)

// This function fetches all the Topics associated with the user
export const fetchTopics = createAsyncThunk('topic/fetchTopics',
    async (uid) =>{
        try{
            console.log("FETCH TOPICS")
            const data = await firebase.firestore().collection('Users').doc(uid).collection("Topics")
                .get()
                .then((querySnapshot) => {
                    // Map the array to have the data of each doc and the ID
                    return querySnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })
                })
                .catch((error) =>{
                    console.log(error)
                })            
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

// Function to delete a topic (Later on we have to make sure we also delete all the cards in it (MAYBE GLOBAL CARDS TOO))
export const deleteTopic = createAsyncThunk('topic/deleteTopic',
    async ({uid, topicId}) =>{
        try{
            console.log("Delete Topic with id " + topicId)
            const response = await firebase.firestore().collection('Users').doc(uid).collection("Topics").doc(topicId)
                .delete()
                .then(data => {
                    console.log(data)
                    return topicId
                })
            return response
        } catch (error) {
            console.log(error)
        }
    }
)


// Show the specific Topic - Get infromation from the API
// Returns the Profile Doc with the specific ID 
export const showTopic = createAsyncThunk('topic/showTopic',
    async () =>{

    }
)

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(updateTopic.fulfilled, (state, action) =>{
            state.topics = state.topics.map((topic) =>{
                console.log(topic)
                if(topic.id !== action.payload.id){
                    // This isn't the item we care about - keep it as-is
                    return topic
                }
                    // Otherwise, this is the one we want - return an updated value
                return {
                    ...topic,
                    ...action.payload
                }
            })
        }),
        builder.addCase(createTopic.fulfilled, (state, action) =>{
            state.topics.push(action.payload)
        }),
        builder.addCase(deleteTopic.fulfilled, (state, action) =>{
            state.topics = state.topics.filter((element) => element.id !== action.payload);
        }),
        builder.addCase(fetchTopics.fulfilled, (state, action) =>{
            state.topics = action.payload
        })
    }

})

// Export the actions
export const { setActiveProfile} = topicSlice.actions

// Export the state variable
export const selectTopics = state => state.topic.topics

export default topicSlice.reducer