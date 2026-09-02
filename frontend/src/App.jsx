'use client';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import Login from './Pages/Login'
import VendorDashboard from './Vendor/Dashboard'
import Catalog from './Pages/Catalog'
import Signup from './Pages/Signup'
import MyRentalItems from './Pages/MyRentalItems'
import HowItWorks from './Pages/HowItWorks'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/vendor-dashboard' element={<VendorDashboard />} />
        <Route path='/catalog' element={<Catalog/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/my-rental-items' element={<MyRentalItems />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App