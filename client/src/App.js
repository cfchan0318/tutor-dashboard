import React from "react";
import { Routes, Route } from 'react-router-dom';

//Page
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";

function App() {

  function getToken() {
    fetch('./api/login', { method: 'POST', })
      .then(response => { return response.json() })
      .then(data => {
        localStorage.setItem('token', "Bearer "+data.token)
      })
  }


  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home loginOnClick={getToken}/>} />
      <Route path="users" element={<Users loginOnClick={getToken}/>} />

    </Routes>


  );
}

export default App;