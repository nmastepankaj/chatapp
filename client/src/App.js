import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { Join } from './component/Join/Join';
import Chat from './component/Chat/Chat';



function App() {
   return (
    <>
    <Router>
      <div className="container">
      <Routes>
          <Route exact path="/" element={<Join/>}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
