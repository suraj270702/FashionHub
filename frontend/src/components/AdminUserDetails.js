import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminUpdateUsers, adminUserDetails } from '../actions/LoginActions'
import { useParams } from 'react-router-dom'
import Loader from './Loader'

const AdminUserDetails = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {loading,user} = useSelector((state)=>state.singleuser)
    const [name,setName] = useState(user ? user.name : '')
    const [email,setEmail] = useState(user ? user.email : '')
    const [role,setRole] = useState(user ? user.role : '')
    
    console.log(role)
    const submitHandler =(e)=>{
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name",user && user.name)
        myForm.set("email",user && user.email)
        myForm.set("role",role)

        dispatch(adminUpdateUsers(id,myForm))
    }
    useEffect(()=>{
    
    dispatch(adminUserDetails(id))
    },[])
  return (
   <>
   {
    loading ? (<Loader />) : (
        <div >
     
        <div className="  px-4 sm:px-0">
          <h3 className="text-base font-bold text-center leading-7 text-gray-900">User Profile Information</h3>
          
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            
            <dt className="text-sm font-medium leading-6 text-gray-900">User Profile Picture</dt>
            <img className='h-48 w-48 ' src={user && user.avatar && user.avatar.url} />
          </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user && user.name}</dd>
            </div>
            
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user && user.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user && user.role}</dd>
            </div>
            
            
            
          </dl>
          <div className='w-72'>
          <form className='flex justify-center items-center ' onSubmit={submitHandler}>
                <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={role} onChange={(e)=>setRole(e.target.value)}>
                   <option>user</option>
                   <option>admin</option>
                </select>
                <button class="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">update</button>
            </form>
          </div>
        </div>
      </div>
    )
   }
   </>
  )
}

export default AdminUserDetails