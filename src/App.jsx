import React from "react";
import "./App.css";
import Header from "./component/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartScan from "./component/StartScan";
import StudentState from "./context/StatusState";


function App() {

  return(
    
    <BrowserRouter>
        <StudentState>
          <Routes>

          <Route exact path='/' element={<Header/>} />
         

    </Routes>
        </StudentState >
      </BrowserRouter >
  ) 
}
export default App;
