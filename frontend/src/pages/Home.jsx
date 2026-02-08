
import Navbar from '@/components/Navbar'
import React from 'react'
import OverView from './OverView'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'


function Home() {
  return (
    <div >
<Navbar></Navbar>
 <ToastContainer></ToastContainer>
<OverView></OverView>
<hr></hr>
<Footer></Footer>
    </div>
  )
}

export default Home
