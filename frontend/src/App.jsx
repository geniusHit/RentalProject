import React from 'react'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import Login from './Pages/Login'
import VendorDashboard from './Vendor/Dashboard'
import Catalog from './Pages/Catalog'
import Signup from './Pages/Signup'
import Counter from './Pages/Counter'
import { useSelector, useDispatch } from "react-redux";
import {toggleLogin} from './globalStates'
import MyRentalItems from './Pages/MyRentalItems'
import HowItWorks from './Pages/HowItWorks'
import Contact from './Pages/Contact'

const App = () => {
  const globalStates = useSelector((state) => state.global.value);
  const dispatch = useDispatch();

  // console.log("globalStates = ", globalStates)

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
      </Routes>
      {/* <button onClick={()=>{dispatch(toggleLogin()); console.log("globalStates = ", globalStates)}}>Toggle Login</button> */}
    </BrowserRouter>
  )
}

export default App