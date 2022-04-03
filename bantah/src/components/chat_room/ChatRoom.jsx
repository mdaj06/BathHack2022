

import { useRef, useState } from "react";
import{useNavigate} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './ChatRoom.css'

firebase.initializeApp({
    apiKey: "AIzaSyDw7l2X2dg7oscBDbbbhCvtm_uwDJ9lm2E",
    authDomain: "bathhackathon2022.firebaseapp.com",
    projectId: "bathhackathon2022",
    storageBucket: "bathhackathon2022.appspot.com",
    messagingSenderId: "329403020816",
    appId: "1:329403020816:web:617344b0e0078993ce7c95",
    measurementId: "G-1SLVEPE28J"
})
let firestore = firebase.firestore();


const ChatRoom= ()=>{

let navigate = useNavigate()
const startChat = (e)=>{

 e.preventDefault();
let selectedId = e.target.attributes.getNamedItem("data-tag").value
localStorage.setItem("secondUserId",selectedId)
firestore.collection('chat_channels').doc(userId+selectedId).set({
    message:"howdy!",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),

    id:userId
})
firestore.collection('user_identity').doc(userId).update({
    inChat:selectedId
})
firestore.collection('user_identity').doc(selectedId).update({
    inChat:userId
})
}
let userId = localStorage.getItem("userId")


let userRef = firestore.collection('users')
let queryUser = userRef
let [users] = useCollectionData(queryUser)

setInterval(function() {
    firestore.collection('user_identity').doc(userId).get().then(
        (doc)=>{
            if (doc.exists) {
                if(doc.data().inChat){
                    firestore.collection('chat_channels').doc(userId+doc.data().inChat).set({
                        message:"howdy!",
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    
                        id:userId
                    })
                    navigate('/chatscreen')
                }
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
        }
    ).catch(function(error) {
        console.log("Error getting document:", error);
      });
       
  }, 2000);
 







return(
    <main>


    <h1>Choose your Opponent</h1>
    <>
    {
       users && users.filter((user)=>user.id!==userId).map((user,idx)=><button data-tag={user.id} className={"light"} key={user.id}  onClick={startChat} >{user.random_name}</button>)
    }
    </>
    </main>
)



}

export default ChatRoom