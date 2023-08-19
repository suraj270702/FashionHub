import React, { useEffect } from 'react'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import {  adminAllOrders } from '../actions/ordersAction'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Edit from '@mui/icons-material/Edit';

import { Link } from 'react-router-dom'
const AdminOrders = () => {
    const dispatch = useDispatch()
    const {loading,error,orders} = useSelector((state)=>state.adminallorders)
    useEffect(()=>{
       if(error){
        toast.error(error)
       }
       dispatch(adminAllOrders())
    },[])
  return (
    <>
    {
        loading ? <Loader /> : (
            
<section class="container mx-auto p-6 font-mono">
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">Order_Id</th>
            <th class="px-4 py-3">Items Quantity</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Amount</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {
            orders && orders.map((item,i)=>(
                <tr class="text-gray-700" key={i}>
            <td class="px-4 py-3 border">
              <div class="flex items-center text-sm">
                <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img class="object-cover w-full h-full rounded-full" src={item.orderItems[0].image} alt="" loading="lazy" />
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p class="font-semibold text-black">{item._id}</p>
                  
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-ms font-semibold border">{item.orderItems.length}</td>
            <td class="px-4 py-3 text-xs border">
            {
  item.orderStatus === "Delivered" ? (
    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
      {item.orderStatus}
    </span>
  ) : item.orderStatus === "Shipped" ? (
    <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-sm">
      {item.orderStatus}
    </span>
  ) : (
    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
      {item.orderStatus}
    </span>
  )
}
            </td>
            <td class="px-4 py-3 text-sm border">&#8377; {item.totalPrice}</td>
            <td class="px-4 py-3 text-sm border"><Link to={`/ordersdetail/${item._id}`}><AspectRatioIcon /></Link><Link to={`/admin/updatesingleorder/${item._id}`} className='ml-2'><Edit /></Link></td>
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

export default AdminOrders