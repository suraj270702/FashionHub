import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminAllUsers } from '../actions/LoginActions'
import {toast,ToastContainer} from "react-toastify"
import Loader from './Loader'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Link } from 'react-router-dom'
const AdminUsers = () => {
    const dispatch = useDispatch()
    const {loading,users} = useSelector((state)=>state.allusers)

    useEffect(()=>{
     dispatch(adminAllUsers())
    },[])
  return (
    <>
    {
        loading ? (<Loader />) : (
            <section class="container mx-auto p-6 font-mono">
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">User_Id</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Role</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {
            users && users.map((item,i)=>(
                <tr class="text-gray-700" key={i}>
            <td class="px-4 py-3 border">
              <div class="flex items-center text-sm">
                <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img class="object-cover w-full h-full rounded-full" src={item.avatar.url} alt="" loading="lazy" />
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p class="font-semibold text-black">{item._id}</p>
                  
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-ms font-semibold border">{item.name}</td>
            <td class="px-4 py-3 text-xs border">
              {item.email}
            </td>
            <td class="px-4 py-3 text-sm border"> 
            {item.role === "admin" ? <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {item.role} </span> : <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> {item.role} </span>}
            </td>
            <td class="px-4 py-3 text-sm border"><Link to={`/admin/user-details/${item._id}`}><AspectRatioIcon /></Link></td>
          </tr>
            ))
          }
          
        </tbody>
      </table>
    </div>
  </div>
  <ToastContainer />
</section>
        )
        
    }
    </>
  )
}

export default AdminUsers