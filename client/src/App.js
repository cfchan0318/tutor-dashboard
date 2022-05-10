import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

//Page
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Schools from "./pages/Schools";
import Classrooms from "./pages/Classroom";
import Subjects from "./pages/Subjects";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Classes from "./pages/Classes";
import ClassDetails from "./pages/ClassDetails";

function App() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('IsLoggedIn');
    navigate('/login');
  }

  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('IsLoggedIn');

  React.useEffect(() => { 
    axios
      .get('/api', { headers: { Authorization: token } })
      .then(response => {
        console.log("ok");
      })
      .catch(error => {logout();})
  },[])

  return (
    <Routes>
      <Route path="/login" element={ <Login />} />
      <Route path="/" element={<Home logoutOnClick={logout}/> }/>
      <Route path="/users" element={<Users logoutOnClick={logout} /> } />
      <Route path="/schools" element={<Schools logoutOnClick={logout} />} />
      <Route path="/classrooms" element={<Classrooms logoutOnClick={logout} /> } />
      <Route path="/subjects" element={<Subjects logoutOnClick={logout} />} />
      <Route path="/students" element={<Students logoutOnClick={logout} /> } />
      <Route path="/courses" element={<Courses logoutOnClick={logout} />} />
      <Route path="/classes" element={<Classes logoutOnClick={logout} /> } />
      <Route path="/classes/:id" element={<ClassDetails logoutOnClick={logout} />}  />
    </Routes>


  );
}

export default App;