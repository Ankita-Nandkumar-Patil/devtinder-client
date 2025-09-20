import React, { useEffect } from 'react'
import UserList from './UserList'
import axios from 'axios'
import {BASE_URL} from "../constants"

export default function Connections() {
  const getConnections = async () => {
    try {
      const connectionData = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );

      console.log(connectionData);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getConnections()
  },[])
  return (
    <div className='flex justify-center mt-20'>
      <UserList width={"w-1/2"} />
    </div>
  )
}
