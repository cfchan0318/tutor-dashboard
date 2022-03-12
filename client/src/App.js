import React from "react";
import { Routes,Route } from 'react-router-dom';

//Page
import Home from "./pages/Home";
import Users from "./pages/Users";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="users" element={<Users/>}/>
    </Routes>
  );
}

export default App;