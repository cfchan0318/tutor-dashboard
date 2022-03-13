import React from "react";
import { Routes, Route } from 'react-router-dom';

//Page
import Dashboard from "./Layout/dashboard/dashboard.component";
import Home from "./pages/Home";
import Users from "./pages/Users";


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
      <Route path="/" element={<Home loginOnClick={getToken}/>} />
      <Route path="users" element={<Users loginOnClick={getToken}/>} />

    </Routes>


  );
}

export default App;