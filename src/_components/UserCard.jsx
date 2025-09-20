import axios from 'axios';
import React from 'react'
import { BASE_URL } from "../constants"
import { useDispatch } from 'react-redux';
import {removeFeedData} from "../utils/feedSlice"

export default function UserCard({ data, mode }) {
  const dispatch = useDispatch()
  const { firstName, lastName, age, gender, photoUrl, about, city, _id } = data;


  const handleReq = async (status, _id) => {
    try {
      console.log("req data", status, _id);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status +"/"+ _id,{},{withCredentials: true}
      );
      dispatch(removeFeedData(_id));
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="h-80 w-full bg-base-200 flex items-center justify-center">
          <img
            src={photoUrl}
            alt="User"
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body px-5 py-4 shadow-[0_-6px_16px_rgba(0,0,0,0.2)]">
          <>
            <h2 className="card-title text-amber-500 font-semibold text-[24px] capitalize">
              {firstName} {lastName}
            </h2>
            <div className="flex justify-center">
              {age && (
                <p className="flex">
                  <img src="/age.png" alt="Shoes" width={24} className="mr-1" />
                  <p>{age}</p>
                </p>
              )}
              {gender && (
                <p className="flex">
                  <img
                    src="/gender.png"
                    alt="Shoes"
                    width={24}
                    className="mr-1"
                  />
                  <p className="capitalize">{gender}</p>
                </p>
              )}
              {city && (
                <p className="flex">
                  <img
                    src="/location.png"
                    alt="Shoes"
                    width={24}
                    className="mr-1"
                  />
                  <p className="capitalize">{city}</p>
                </p>
              )}
            </div>
            <p className="pt-4 line-clamp-4 min-h-[72px]">{about}</p>
          </>

          {mode == "feed" && (
            <div className="card-actions justify-between mt-2">
              <button onClick={() => handleReq("interested", _id)}>
                <img
                  src="/like.png"
                  width="44"
                  height="44"
                  alt="like"
                  title="Interested"
                />
              </button>
              <button onClick={() => handleReq("ignored", _id)}>
                <img
                  src="/dislike.png"
                  width="44"
                  height="44"
                  alt="dislike"
                  title="Ignore"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
