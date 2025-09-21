import React from 'react'
import { BASE_URL, DEFAULT_PROFILE} from "../constants"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/reqSlice';

export default function UserList({width, data, mode}) {
  const dispatch = useDispatch()
  const handleReq = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      console.log(status, _id)
      dispatch(removeRequest(_id))
    } catch (error) {
      console.error(error)
    }
  }  
  
  
  return data && (
    <div className={`${width}`}>
      <ul className="list bg-base-200 rounded-box shadow-md">
        {data?.map((item) => (
          <li className="list-row" key={item?._id}>
            <div>
              <img
                className="size-12 rounded-box"
                src={item?.photoUrl || DEFAULT_PROFILE}
              />
            </div>
            <div>
              <div className="capitalize text-[20px] font-semibold text-amber-600">
                {item?.firstName} {item?.lastName}
              </div>
              <div className="text-[12px] flex gap-2">
                <span>{item?.age}</span>
                <span>|</span>
                <span>{item?.gender}</span>
                <span>|</span>
                <span>{item?.city}</span>
              </div>
            </div>
            <p className="list-col-wrap text-[13px]">{item?.about}</p>

            {mode == "requests" && (
              <div className="card-actions justify-between mt-2 gap-4">
                <div className="tooltip">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-green-500 -rotate-10 font-black">
                      Accept!
                    </div>
                  </div>
                  <button onClick={() => handleReq("accepted", item?.requestId)}>
                    <img
                      src="/like.png"
                      width="30"
                      height="30"
                      alt="like"
                      title="Accept"
                    />
                  </button>
                </div>
                <div className="tooltip">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-red-500 -rotate-10 font-black">
                      Reject!
                    </div>
                  </div>
                  <button onClick={() => handleReq("rejected", item?.requestId)}>
                    <img
                      src="/dislike.png"
                      width="30"
                      height="30"
                      alt="dislike"
                      title="Reject"
                    />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
