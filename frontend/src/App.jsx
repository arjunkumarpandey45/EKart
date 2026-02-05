import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import Navbar from './components/Navbar'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import './app.css'
import Verify from './pages/verify'
import VerifyEmail from './pages/VerifyEmail'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><Home /></>
    },
    {
      path: '/login',
      element: <><Login /></>
    },
    {
      path: '/signup',
      element: <><Signup /></>
    },
    {
      path: '/verify',
      element: <><Verify /></>
    }
    ,
    {
      path: '/verify-email/:token',
      element: <><VerifyEmail/></>
    }
  ])



  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
