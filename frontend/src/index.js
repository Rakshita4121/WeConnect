import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import HomePage from './pages/Home';
import './index.css';
import Navbar from './layouts/Navbar';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
      
      </BrowserRouter>
  </div>

);
