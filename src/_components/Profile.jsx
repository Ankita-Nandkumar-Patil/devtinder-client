import React from 'react'
import UserDetailsForm from './UserDetailsForm'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

export default function Profile() {
  const loggedInUser = useSelector((store) => store.user);
  
  return (
    <div className="flex items-center justify-center gap-20 mt-14">
      <UserDetailsForm width="1/3" initialData={loggedInUser} mode="profileEdit"/>
      <UserCard data={loggedInUser} mode="profile" />
    </div>
  )
}
