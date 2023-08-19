import React, { useEffect, useState } from 'react'
import DescriptionIcon from "@material-ui/icons/Description"
import Storage from "@material-ui/icons/Storage"

import { useDispatch, useSelector } from 'react-redux'
import {toast,ToastContainer} from "react-toastify"
import { useNavigate, useParams } from 'react-router-dom'
import { new_product_reset, update_products_reset } from '../constants/productsConstants'
import { adminNewProduct, adminUpdateProduct, getProductDetails } from '../actions/productsActions'

const UpdateProduct = () => {
    
    const {error:UpdateError,loading:updateloading,isUpdated} = useSelector((state)=>state.deleteproduct)
    const{error,product} = useSelector((state)=>state.productDetails)
    const dispatch = useDispatch()
    const updatenavigate = useNavigate()
    const {id} = useParams()
    const categories = [
        "Men-Shirt",
        "Men-Tshirt",
        "Men-Jeans",
        "Men-Trouser",
        "Men-Jacket",
        "smartphone"
      ]
      const [name,setName] = useState("")
      const [stock,setStock] = useState(0)
      const [price,setPrice] = useState(0)
      const [category,setCategory] = useState("")
      const [description,setDescription] = useState("")
      const [images,setImages] = useState([])
      const [oldimages,setOldImages] = useState([])
      const [imagePreviews,setImagePreviews] = useState([])

      useEffect(()=>{
          if(product && product._id !== id){
            dispatch(getProductDetails(id))
          }
          else{
            setName(product.name)
            setStock(product.stock)
            setPrice(product.price)
            setCategory(product.category)
            setDescription(product.description)
            setOldImages(product.images)
          }
          if(isUpdated){
            toast.success("Product Updated Successfully")
            updatenavigate("/admin/products")
            dispatch({type:update_products_reset})
          }
        },[dispatch,UpdateError,isUpdated,id,product])

        const submitHandler=(e)=>{
            e.preventDefault()

            const myform = new FormData()
            myform.set("name",name)
            myform.set("price",price)
            myform.set("stock",stock)
            myform.set("description",description)
            myform.set("category",category)

            images.forEach((image)=>{
                myform.append("images",image)
            })

            dispatch(adminUpdateProduct(id,myform))


        }

        const imageHandler=(e)=>{
            const files = Array.from(e.target.files)
            setImages([])
            setImagePreviews([])
            setOldImages([])
            files.forEach((file)=>{
                const reader = new FileReader()

                reader.onload=()=>{
                    if(reader.readyState===2){
                        setImagePreviews((old)=>[...old,reader.result])
                        setImages((old)=>[...old,reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })
        }

  return (
    <>
    
<body >
  <div class="min-h-screen flex items-center justify-center mt-4 ">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
      
      <h1 class="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">FashionDestination</h1>
      <form encType='multipart/form-data' onSubmit={submitHandler}>
        <div class="mb-4">
          <label for="Name" class="block mb-2 text-sm text-gray-600">Name Of Product</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2 text-sm text-gray-600">Description </label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type="text" id="description" name="description" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="stock" class="block mb-2 text-sm text-gray-600">Stock</label>
          <input value={stock} onChange={(e)=>setStock(e.target.value)} type="number" id="stock" name="stock" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="stock" class="block mb-2 text-sm text-gray-600">Category </label>
          <select onChange={(e)=>setCategory(e.target.value)} name='category'  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required >
            <option value={category}>{category}</option>
            {
                categories.map((item)=>(
                    <option key={item} value={item}>
                         {item}
                    </option>
                ))
            }
          </select>
        </div>
        <div class="mb-4">
          <label for="price" class="block mb-2 text-sm text-gray-600">Price </label>
          <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="price" name="price" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-6 ">
          <label for="productimage" class="block mb-2 text-sm text-gray-600">Choose files<Storage /></label>
          <input type="file" id="productimage" onChange={imageHandler} name="images" accept='image/*'  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required multiple/>
        </div>
        <div class="mb-6 flex justify-between h-16 w-16 ">
          {
            oldimages && oldimages.map((item,i)=>(
                <img key={i} src={item.url} />
            ))
          }
        </div>
        <div class="mb-6 flex justify-between h-16 w-16 ">
          {
            imagePreviews.map((item,i)=>(
                <img key={i} src={item} />
            ))
          }
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2">Create a Product</button>
      </form>
      
    </div>
  </div>
  <ToastContainer />
</body>

    </>
  )
}

export default UpdateProduct