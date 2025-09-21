import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import UserList from "./UserList";
import NodataSlate from "./NodataSlate";

export default function Requests() {
  const [reqData, setReqData] = useState("");
  const getRequests = async () => {
    try {
      const reqData = await axios.get(BASE_URL + "/user/received-requests", {
        withCredentials: true,
      });
      const fromUsers = reqData?.data?.data?.map((item) => item.fromUserId);

      setReqData(fromUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  console.log(reqData);

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
