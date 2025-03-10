import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import HomePage from './pages/Home';
import './index.css';
import Navbar from './layouts/Navbar';
import SignUp from './pages/signup';
import LogIn from './pages/login';
import EventsPage from './pages/Events'
import OrganizationsPage from './pages/Organizations'
import EventDetails from './components/Events/EventDetails'
import OrganizationDetail from './components/Organizations/OrganizationDetail';
import CreateEventForm from './components/Events/CreateEventForm'
import EditEventForm from './components/Events/EditEventForm';
import CreateOrganizationForm from './components/Organizations/CreateOrganizationForm';
import EditOrganizationForm from './components/Organizations/EditOrganizationForm'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/events' element={<EventsPage/>} />
            <Route path='/events/:id' element={<EventDetails/>} />
            <Route path='/events/:id/edit' element={<EditEventForm/>} />
            <Route path="/events/new" element={<CreateEventForm/>} />
            <Route path='/organizations' element={<OrganizationsPage/>} />
            <Route path='/organizations/:id' element={<OrganizationDetail/>} />
            <Route path="/organizations/new" element={<CreateOrganizationForm/>} />
            <Route path='/organizations/:id/edit' element={<EditOrganizationForm/>} />
          </Routes>
      
      </BrowserRouter>
  </div>

);
