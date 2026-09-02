import React, { useEffect } from 'react'
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
import { Redis } from '@upstash/redis'

const App = () => {
  useEffect(() => {
    const ab = async () => {
      const redis = new Redis({
        url: 'https://unbiased-gazelle-40519.upstash.io',
        token: 'Ap5HAAIgcDF3JPG-x9A50Dhkk4wAXQDDsqLf7zzs4gVNrXMt_CgVDQ',
      })
      // const redis = new Redis({
      //   url: "https://unbiased-gazelle-40519.upstash.io",
      //   // AZ5HAAIgcDE1ZjVkNTJkYmJiNzU0NzZiOWNiODhjMjY3NGI1ODcxNA
      //   token: "AZ5HAAIgcDE1ZjVkNTJkYmJiNzU0NzZiOWNiODhjMjY3NGI1ODcxNA",
      // })

      // await redis.set("foo", "bar");
      const foo = await redis.get("foo");
      console.log("foo : ", foo)

      // await redis.set("width", "600");
      const width = await redis.get("width")
      console.log("width : ", width)
    }

    ab()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/vendor-dashboard' element={<VendorDashboard />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/my-rental-items' element={<MyRentalItems />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App