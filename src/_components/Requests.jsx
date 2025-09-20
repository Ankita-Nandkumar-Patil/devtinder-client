import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL} from "../constants"

export default function Requests() {
  const getRequests = async () => {
    try {
      const reqData = await axios.get(BASE_URL + "/user/received-requests", {withCredentials: true});
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{getRequests()},[])

  return (
    <div>Requests</div>
  )
}
