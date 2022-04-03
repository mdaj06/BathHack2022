

import { useRef, useState } from "react";
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

let navigate = useNavigate()
const startChat = (e)=>{
e.preventDefault();
let selectedId = e.target.attributes.getNamedItem("data-tag").value
firestore.collection('chat_channels').doc(userId+selectedId).set({
    message:"howdy!",
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