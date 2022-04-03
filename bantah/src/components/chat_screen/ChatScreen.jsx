
import './ChatScreen.css'
import { useRef, useState,useEffect } from "react";
import{useNavigate} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


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



const ChatScreen =()=>{
    
let navigate = useNavigate()
const [formValue, setFormValue] = useState('');
let userId = localStorage.getItem("userId")
let secondUserId = localStorage.getItem("secondUserId")
let chatRef = firestore.collection('chat_channels')
let queryChat = chatRef
let [chats] = useCollectionData(queryChat)

useEffect(()=>{
    return ()=>{
        localStorage.removeItem("secondUserId")
    }
})

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