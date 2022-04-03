
import './ChatScreen.css'
import { useRef, useState,useEffect } from "react";
import{useNavigate} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


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



const ChatScreen =()=>{
    
let navigate = useNavigate()
const [formValue, setFormValue] = useState('');
let userId = localStorage.getItem("userId")
let secondUserId = localStorage.getItem("secondUserId")
let chatRef = firestore.collection('chat_channels')
let queryChat = chatRef
let [chats] = useCollectionData(queryChat)

// useEffect(()=>{
//     return ()=>{
//         localStorage.removeItem("secondUserId")
//     }
// })

console.log(chats)


const onSubmit=(e)=>{

    e.preventDefault();
    firestore.collection('chat_channels').doc(userId+secondUserId).update({
        message:formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        id:userId
    })

}

    


  return (
  <main>
      <div>
        {
            chats && chats.filter((chat)=>chat.id===userId || chat.id===secondUserId)
            .map((chat)=><div panclassName={chat.id===userId?"blue":"pink"} key={chat.createdAt}>{chat.message}</div>)
        }
      </div>

    
    <form onSubmit={onSubmit}>

      <input id="chat" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Let the banter begin" />

      <button className="light" type="submit" disabled={!formValue}>send it!</button>

    </form>
  </main>)
}
export default ChatScreen