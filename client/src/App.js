import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

//Page
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";


function App() {
  const [isLoggedIn,setIsLoggedIn] = React.useState(null);
  const [token,setToken] = React.useState(null);
  
  /*function setToken() {
    fetch('./api/login', { method: 'POST', })
      .then(response => { return response.json() })
      .then(data => {
        localStorage.setItem('token', "Bearer " + data.token)
      })
  }*/

  function getToken(){
    let token = localStorage.getItem('token');
    return token;
  }

  React.useEffect(() => {
    setToken(getToken());
    setIsLoggedIn(getToken()!==null);
  },[]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isLoggedIn?<Home loginOnClick={getToken} />:<Navigate to="/login" />} />
      <Route path="users" element={isLoggedIn?<Users loginOnClick={getToken} />:<Navigate to="/login" />} />
      <Route path="*" element={isLoggedIn?<Users loginOnClick={getToken} />:<Navigate to="/login" />} />
    </Routes>


  );
}

export default App;