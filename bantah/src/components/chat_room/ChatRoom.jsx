

import { useState } from "react";
import{useNavigate} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './ChatRoom.css'

firebase.initializeApp({
    apiKey: "AIzaSyDpN1ESW28OKAnlHXDBABGni8BqU2EVOZM",
    authDomain: "bathhack2022.firebaseapp.com",
    projectId: "bathhack2022",
    storageBucket: "bathhack2022.appspot.com",
    messagingSenderId: "878927659545",
    appId: "1:878927659545:web:50900f8726a94bdadb2088",
    measurementId: "G-P0CKCYF2T7"
})
let firestore = firebase.firestore();


const ChatRoom= ()=>{

console.log(firestore)
let userRef = firestore.collection('users')
 let query = userRef

 let [users] = useCollectionData(query)

 console.log(users)


return(
    <main>

    <h1>Choose your Opponent</h1>
    <>
    {
       users && users.map((user,idx)=><button className={"light"} key={user.random_name+idx} >{user.random_name}</button>)
    }
    </>
    </main>
)



}

export default ChatRoom