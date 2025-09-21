import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import UserList from "./UserList";
import NodataSlate from "./NodataSlate";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/reqSlice";

export default function Requests() {
  const dispatch = useDispatch()
  const reqData = useSelector((store)=> store.request)

  // const [reqData, setReqData] = useState("");

  const getRequests = async () => {
    try {
      const reqData = await axios.get(BASE_URL + "/user/received-requests", {
        withCredentials: true,
      });
      // const fromUsers = reqData?.data?.data?.map((item) => item.fromUserId);
      const fromUsers = reqData?.data?.data?.map((item) => ({
        requestId: item._id, // keep the request id
        ...item.fromUserId, // spread all user details
      }));
      dispatch(addRequests(fromUsers))
      // setReqData(fromUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="font-bold text-2xl text-amber-500 mb-10 mt-20">
        Pending Requests
      </div>
      {reqData?.length > 0 ? (
        <UserList width="w-1/2" data={reqData} mode="requests" />
      ) : (
        <NodataSlate text="No connections yet — keep swiping to spark one!" />
      )}
    </div>
  );
}
