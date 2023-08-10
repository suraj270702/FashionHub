import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
const Profile = () => {
    const {user} = useSelector((state)=>state.user)
  return (
    <>
     <div >
     
  <div className="  px-4 sm:px-0">
    <h3 className="text-base font-bold text-center leading-7 text-gray-900">User Profile Information</h3>
    
  </div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      
      <dt className="text-sm font-medium leading-6 text-gray-900">User Profile Picture</dt>
      <img className='h-48 w-48 ' src={user.avatar.url} />
    </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      
        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
      </div>
      
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
      </div>
      
      
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Useful Links</dt>
        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">My Orders</span>
                  
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Link to="/orders" className="font-medium text-indigo-600 hover:text-indigo-500">My Orders</Link>
              </div>
            </li>
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">Update Profile</span>
                  
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Link to="/update" className="font-medium text-indigo-600 hover:text-indigo-500">Update</Link>
              </div>
            </li>
            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
              <div className="flex w-0 flex-1 items-center">
                
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">Change Password</span>
                  
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Link to="/changepassword" className="font-medium text-indigo-600 hover:text-indigo-500">Change Password</Link>
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</div>

    </>
  )
}

export default Profile