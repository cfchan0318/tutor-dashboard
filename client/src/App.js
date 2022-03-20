import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

//Page
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Schools from "./pages/Schools";
import Classrooms from "./pages/Classroom";


function App() {
  
  const navigate = useNavigate();
  
  function logout(){
    
    localStorage.removeItem('token');
    localStorage.removeItem('IsLoggedIn');
    navigate('/login');
  }

 
  return (
    <Routes>
      <Route path="/login" element={localStorage.getItem('IsLoggedIn')?<Navigate to="/" />:<Login />} />
      <Route path="/" element={localStorage.getItem('IsLoggedIn')?<Home logoutOnClick={logout} />:<Navigate to="/login" />} />
      <Route path="/users" element={localStorage.getItem('IsLoggedIn')?<Users logoutOnClick={logout} />:<Navigate to="/login" />} />
      <Route path="/schools" element={localStorage.getItem('IsLoggedIn')?<Schools logoutOnClick={logout} />:<Navigate to="/login" />} />
      <Route path="/classrooms" element={localStorage.getItem('IsLoggedIn')?<Classrooms logoutOnClick={logout} />:<Navigate to="/login" />} />
    </Routes>


  );
}

export default App;