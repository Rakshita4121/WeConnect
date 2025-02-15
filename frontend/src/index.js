import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import HomePage from './pages/Home';
import './index.css';
import Navbar from './layouts/Navbar';
import SignUp from './pages/signup';
import LogIn from './pages/login';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path='/login' element={<LogIn/>} />
          </Routes>
      
      </BrowserRouter>
  </div>

);
