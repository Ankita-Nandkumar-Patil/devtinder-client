import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailID, setEmailID] = useState("ross@gmail.com");
  const [password, setPassword] = useState("Ross@123");
  const [errMsg, setErrMsg] = useState("")

  const handleLogin = async () => {
    try {

      const result = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
        // for setting cookies-token
      );

      // adding userdata to store
      dispatch(addUser(result.data))
      navigate("/feed")
    } catch (error) {
      console.error(error);
      setErrMsg(error?.response?.data || "Something went wrong!")
    }
  };


  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm mt-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <figure className="px-10 pt-5">
            <img src="/login.png" alt="Shoes" className="rounded-xl" />
          </figure>

          {/* username */}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              value={emailID}
              required
              onChange={(e) => setEmailID(e.target.value)}
            />
          </label>
          {/* <div className="validator-hint hidden">Enter valid email address</div> */}

          {/* password */}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              value={password}
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          {/* <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p> */}
          {/* btn */}
          <p className="text-red-600">{errMsg}</p>
          <div className="card-actions mt-5">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="inline-block cursor-pointer font-semibold pl-1 hover:text-purple-400 hover:underline hover:scale-105 transition-transform duration-200"
            >
              Sign Up !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
