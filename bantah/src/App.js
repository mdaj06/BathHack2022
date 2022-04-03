
import { createContext } from 'react';
import './App.css';
import SignUp from './components/sign_up/SignUp.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import ChatRoom from './components/chat_room/ChatRoom';
import ChatScreen from './components/chat_screen/ChatScreen'
import PublicProfile from './components/public_profile/PublicProfile';


const FirebaseContext = createContext()

function App() {
  return (
    <FirebaseContext.Provider value={{}}>
      <Router>
      <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path='/chat' element={<ChatRoom/>} />
      <Route path='/publicprofile' element={<PublicProfile/>} />
      <Route path='/chatscreen' element={<ChatScreen/>} />
      </Routes>
    </Router>
    </FirebaseContext.Provider>
    
  );
}

export default App;
