import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from "../constants";
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedData } from "../utils/feedSlice"

export default function Feed() {
  const dispatch = useDispatch()
  const feedData = useSelector((store)=> store.feed)

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeedData(res.data))
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFeed()
  },[])
  return feedData && (
    <div className="mt-10">
      {/* {feedData?.data?.map} */}
      <UserCard data={feedData?.data[0]} mode="feed" />
    </div>
  )
}
