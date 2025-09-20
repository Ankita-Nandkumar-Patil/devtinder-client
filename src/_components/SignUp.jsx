import React from 'react'
import UserDetailsForm from './UserDetailsForm'
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div>
      <UserDetailsForm width="w-1/2" initialData={{}} mode="signup" />
      <p className="flex justify-center mb-5">
        Already have an account?{" "}
        <Link
          to="/login"
          className="inline-block cursor-pointer font-semibold pl-1 hover:text-purple-400 hover:underline hover:scale-105 transition-transform duration-200"
        >
          Login !
        </Link>
      </p>
    </div>
  );
}
