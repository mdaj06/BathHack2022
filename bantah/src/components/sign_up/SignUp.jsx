

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
    apiKey: "AIzaSyDw7l2X2dg7oscBDbbbhCvtm_uwDJ9lm2E",
  authDomain: "bathhackathon2022.firebaseapp.com",
  projectId: "bathhackathon2022",
  storageBucket: "bathhackathon2022.appspot.com",
  messagingSenderId: "329403020816",
  appId: "1:329403020816:web:617344b0e0078993ce7c95",
  measurementId: "G-1SLVEPE28J"
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





