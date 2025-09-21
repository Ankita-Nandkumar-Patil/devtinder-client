import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../utils/feedSlice";
import NodataSlate from "./NodataSlate"; // assuming you have this

export default function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed); // now an array

  const getFeed = async () => {
    if (feedData.length > 0) return; // skip if already loaded
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeedData(res.data.data)); // only array into store
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log("feeee", feedData);

  return (
    <div className="mt-10 flex justify-center relative">
      {feedData.length > 0 ? (
        feedData.map((user, index) => (
          <div
            key={user._id}
            className="absolute transition-transform duration-300"
            style={{
              transform: `translateY(${index * 10}px) scale(${
                1 - index * 0.05
              })`,
              zIndex: feedData.length - index,
            }}
          >
            <UserCard data={user} mode="feed" />
          </div>
        ))
      ) : (
        <NodataSlate text="No more profiles left for now!" />
      )}
    </div>
  );
}
