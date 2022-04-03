

import { useContext, useState } from "react";
import{Navigate} from "react-router-dom"
import landingScreen from "./landingScreen.png"
import "./SignUp.css"


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from "../chat_room/ChatRoom";


firebase.initializeApp({
    apiKey: "AIzaSyDpN1ESW28OKAnlHXDBABGni8BqU2EVOZM",
    authDomain: "bathhack2022.firebaseapp.com",
    projectId: "bathhack2022",
    storageBucket: "bathhack2022.appspot.com",
    messagingSenderId: "878927659545",
    appId: "1:878927659545:web:50900f8726a94bdadb2088",
    measurementId: "G-P0CKCYF2T7"
})




const auth = firebase.auth();
const firestore = firebase.firestore();

const SignUp=()=>{

    
    const [user]  = useAuthState(auth)
    

    if(user){
        
        firestore.collection('user_identity').doc(user.uid).set({
            name:"",
            social_media:"",
            user_registered:false,
            random_name:"",
            location:[0,0],
            inChat:false
        }).then(()=>{
            localStorage.setItem("userId", user.uid)
            
    }).catch(()=>console.log("encountered an error"))
    }
    
    const signInWithGoogle = () => {
       
        console.log("here")
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
        
        
      }
    

      
    
    

return(
    
   <main>
        <img src={landingScreen} alt={"logo"} />
        {
            user?
            <Navigate replace to="/publicprofile"/>
            
            :<button onClick={signInWithGoogle}>{"Register"}</button>
          
           

        
        }
   </main>
 
  
    
)

}

export default SignUp;





