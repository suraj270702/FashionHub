import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminAllReviews } from '../actions/productsActions'
import Loader from './Loader'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Link } from 'react-router-dom'
const AdminReviews = () => {
    const dispatch = useDispatch()
    const id = "64a4686366943bd7107ce958"
    const [prdouctId,setProductId] = useState("")
    const {loading,reviews} = useSelector((state)=>state.reviews)
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(adminAllReviews(prdouctId))
    }
  return (
    <>
    <div className='flex items-center justify-center'>
        <div>
                      <label for="productId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your productId</label>
                      <input type="productId" name="productId" id="productId" value={prdouctId} onChange={(e)=>setProductId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="product Id" required="false" />
        </div>
        <button onClick={submitHandler} className="mt-6 flex w-12 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Search
            </button>
    </div>
    {
        reviews && reviews.length > 0 ? (
            <section class="container mx-auto p-6 font-mono">
  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th class="px-4 py-3">Review_ID</th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Comment</th>
            <th class="px-4 py-3">Rating</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {
            reviews && reviews.map((item,i)=>(
                <tr class="text-gray-700" key={i}>
            <td class="px-4 py-3 border">
              <div class="flex items-center text-sm">
                
                <div>
                  <p class="font-semibold text-black">{item._id}</p>
                  
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-ms font-semibold border">{item.name}</td>
            <td class="px-4 py-3 text-xs border">
              {item.comment}
            </td>
            <td class="px-4 py-3 text-sm border"> 
            {item.rating >= 3 ? <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {item.rating} </span> : <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> {item.rating} </span>}
            </td>
            <td class="px-4 py-3 text-sm border"><Link to={`/product/${prdouctId}`}><AspectRatioIcon /></Link></td>
          </tr>
            ))
          }
          
        </tbody>
      </table>
    </div>
  </div>
  
</section>
        ) : <h1>No Reviews Found For This Product</h1>
    }
    </>
  )
}

export default AdminReviews