
import { createContext } from 'react';
import './App.css';
import SignUp from './components/sign_up/SignUp.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import ChatRoom from './components/chat_room/ChatRoom';

const FirebaseContext = createContext()

function App() {
  return (
    <FirebaseContext.Provider value={{}}>
      <Router>
      <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path='/chat' element={<ChatRoom/>} />
      </Routes>
    </Router>
    </FirebaseContext.Provider>
    
  );
}

export default App;
