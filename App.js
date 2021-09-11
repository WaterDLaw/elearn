import 'react-native-gesture-handler';

import React, { Component, useEffect } from 'react';
import { StyleSheet, LogBox} from 'react-native';

import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

//redux
import { store } from './features/store';
import { Provider, useSelector, useDispatch } from 'react-redux';

//screens

import Main from './Main';



const App =() => {
  return(
    <Provider store= {store} >
      <Main></Main>
    </Provider>
  )


}

var firebaseConfig = {
  apiKey: "AIzaSyBlAKlWPlJ67enq7MgQPZNDlaJM_KZ261E",
  authDomain: "elearn-8c48f.firebaseapp.com",
  projectId: "elearn-8c48f",
  storageBucket: "elearn-8c48f.appspot.com",
  messagingSenderId: "350519119138",
  appId: "1:350519119138:web:ee1d676bf9f09a19ffa97b",
  measurementId: "G-HZKV8TZJ9Y"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}
const dbh = firebase.firestore();
console.log(dbh)

// Timer warning firestore + react native have to do this work arround
LogBox.ignoreLogs(['Setting a timer for a long period of time'], ['headerTitleStyle was given a value of [object Object], this has no effect on headerStyle']);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },



});

export default App