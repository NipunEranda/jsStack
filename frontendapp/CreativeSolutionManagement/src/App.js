import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';

import AboutUs from './Views/AboutUs/AboutUs';
import ContactUs from './Views/ContactUs/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/AboutUs' element={<AboutUs/>} />
        <Route path='/ContactUs' element={<ContactUs/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;