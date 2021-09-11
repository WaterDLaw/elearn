import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import firebase from 'firebase/app'
import "firebase/firestore";


const initialState = {
    decks:[]
}

const createDeck = createAsyncThunk('deck/createDeck',
    async ({cards, uid, topicId}) => {
        try {
            const response = firebase.firestore().collection("User").doc(uid).collection("Topics").doc(topicId)
                .collection("Decks").add({
                    cards: cards,
                    uid: uid,
                    topicId: topicId
                }).then((data) =>{
                    console.log(data)
                }).catch((error)=>{
                    console.log("Error create deck " + error)
                })
                return response
        } catch (error) {
            console.log("Create deck call " + error)
        }   
    })

const updateDeck = createAsyncThunk('deck/updateDeck',
    async (cards) => {

    })

const deleteDeck = createAsyncThunk('deck/deleteDeck',
    async () => {

    })

const fetchDecks = createAsyncThunk('deck/fetchDecks',
    async () => {

    })

const fetchDeckById = createAsyncThink('deck/fetchDeckById',
    async () => {

    })

const deckSlice = createSlice({
    name: 'deck',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(createDeck.fulfilled, (state, action) =>{
            console.log("createDeck Action " + action)
        })
    }
})