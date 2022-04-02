
import{Navigate} from "react-router-dom"
import landingScreen from "./landingScreen.png"
import "./SignUp.css"
import SolidButton from "../solid_button/SolidButton";


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    
console.log(user)
return(
    
   <main>
        <img src={landingScreen} alt={"logo"} />
        {
            user?<Navigate replace to="/chat" />:<SolidButton text={"Register"} signIn={signInWithGoogle} />
        }
   </main>
 
  
    
)

}

export default SignUp;




const signInWithGoogle = () => {
    console.log("here")
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

