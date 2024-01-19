import React from 'react'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'
import NavBar from './components/NavBar'
import { Authcontextprovide } from './context/Authcontext'
import Protectedroute from './components/Protectedroute'

const App = () => {
  return <>
    <Authcontextprovide>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Protectedroute><Profile /></Protectedroute>} />
      </Routes>
    </Authcontextprovide>
  </>
}

export default App
