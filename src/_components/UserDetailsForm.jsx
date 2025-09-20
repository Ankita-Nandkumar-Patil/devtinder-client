import axios from "axios";
import React, { useState } from "react";
import {BASE_URL} from "../constants"
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"

export default function UserDetailsForm({ width, initialData, mode }) {
  const dispatch = useDispatch();

  // Shared Tailwind classes for inputs
  const inputClass =
    "input input-ghost w-full shadow-[0_0_6px_rgba(255,255,255,0.1)] " +
    "focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] " +
    "focus:ring-1 focus:ring-purple-400 transition-all";

  const textareaClass =
    "textarea m-2 w-full textarea-ghost shadow-[0_0_6px_rgba(255,255,255,0.1)] " +
    "focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] " +
    "focus:ring-1 focus:ring-purple-400 transition-all";
  
  console.log("initialData", initialData);

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    emailID: initialData?.emailID || "",
    password: initialData?.password || "",
    photoUrl: initialData?.photoUrl || "",
    age: initialData?.age || "",
    city: initialData?.city || "",
    gender: initialData?.gender || "",
    about: initialData?.about || "",
    skills: initialData?.skills || [],
  });

  const [toast, setToast] = useState("")

  const handlechange = (e) => {
    const { name, value} = e.target;
    setFormData((prev) => ({...prev,[name]: value}))
  }
  
  const handleSubmit = async () => {
    try {
      await axios.post(BASE_URL + "/signup",formData);
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfileEdit = async () => {
    try {
      const { emailID, password, ...profileData } = formData; // exclude email + password
      const res = await axios.patch(BASE_URL + "/profile/edit", profileData, {
        withCredentials: true,
      });
      setToast(res?.data?.message);
      dispatch(addUser(res?.data?.data))
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <div className={`card bg-base-100 shadow-sm ${width}`}>
          <div className="card-body pb-0">
            <h2 className="card-title mb-4">User Details</h2>

            <div className="flex justify-center">
              <label className="flex-1 floating-label m-2">
                <span>
                  First Name
                  <span className="text-red-500 ml-1 text-xl">*</span>
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handlechange}
                  placeholder="First Name"
                  className={inputClass}
                />
              </label>

              <label className="flex-1 floating-label m-2">
                <span>
                  Last Name <span className="text-red-500 ml-1 text-xl">*</span>
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handlechange}
                  placeholder="Last Name"
                  className={inputClass}
                />
              </label>
            </div>

            {mode == "signup" && (
              <div className="flex justify-center">
                <label className="flex-1 floating-label m-2">
                  <span>
                    Your Email{" "}
                    <span className="text-red-500 ml-1 text-xl">*</span>
                  </span>
                  <input
                    type="text"
                    name="emailID"
                    value={formData.emailID}
                    onChange={handlechange}
                    placeholder="mail@site.com"
                    className={inputClass}
                  />
                </label>

                <label className="flex-1 floating-label m-2">
                  <span>
                    Password{" "}
                    <span className="text-red-500 ml-1 text-xl">*</span>
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handlechange}
                    placeholder="Password"
                    className={inputClass}
                  />
                </label>
              </div>
            )}

            <label className="flex-1 floating-label m-2">
              <span>Photo Url</span>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handlechange}
                placeholder="Photo Url"
                className={inputClass}
              />
            </label>

            <div className="flex justify-center">
              <label className="flex-1 floating-label m-2">
                <span>Age</span>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handlechange}
                  placeholder="Age"
                  className={inputClass}
                />
              </label>

              <label className="flex-1 floating-label m-2">
                <span>City</span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handlechange}
                  placeholder="City"
                  className={inputClass}
                />
              </label>

              <select
                defaultValue="Gender"
                name="gender"
                value={formData.gender}
                onChange={handlechange}
                className="flex-1 select select-ghost m-2"
              >
                <option disabled>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <textarea
              placeholder="Skills"
              name="skills"
              value={formData.skills}
              onChange={handlechange}
              className={textareaClass}
            ></textarea>

            <textarea
              placeholder="About"
              name="about"
              value={formData.about}
              onChange={handlechange}
              maxLength={200}
              className={textareaClass}
            />
            <p className="text-sm text-gray-400 text-right">
              {formData.about.length}/200
            </p>

            <div className="card-actions justify-center mt-4 mb-2">
              {mode == "signup" && (
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Sign Up
                </button>
              )}

              {mode == "profileEdit" && (
                <button className="btn btn-primary" onClick={handleProfileEdit}>
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
