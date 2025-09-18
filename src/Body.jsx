import React from 'react'
import Navbar from './_components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './_components/Footer'

export default function Body() {
  return (
    <div>
      <Navbar/>
      <Outlet /> 
      {/* any children route jsx will be rendered inside this outle */}
      <Footer/>
    </div>
  )
}
