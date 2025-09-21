import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import axios from "axios";
import { BASE_URL } from "../constants";
import NodataSlate from "./NodataSlate";

export default function Connections() {
  const [connectionData, setConnectionsData] = useState([]);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnectionsData(res.data?.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="font-bold text-2xl text-amber-500 my-10">
        Your Connections
      </div>
      {connectionData?.length > 0 ? (
        <UserList width={"w-1/2"} mode="connections" data={connectionData} />
      ) : (
        <NodataSlate text="Nobody’s knocking right now. Stay active and keep the vibes going!" />
      )}
    </div>
  );
}
