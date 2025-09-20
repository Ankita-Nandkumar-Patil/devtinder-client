import React, { useEffect } from 'react'
import axios from "axios";

import Navbar from './_components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './constants'
import {addUser} from "./utils/userSlice"

export default function Body() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.user);
  
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data))

    } catch (error) {
      if (error.status === 401) {
        navigate("/login")
      }
      console.error(error)
    }
  };


  useEffect(() => {
    fetchUser()
  }, [])
  
  return (
    <div>
      <Navbar/>
      <Outlet /> 
      {/* any children route jsx will be rendered inside this outle */}
      {/* <Footer/> */}
    </div>
  )
}
