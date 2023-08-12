import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addtoCart, removeItemsFromCart } from '../actions/cartActions'
import NoCart from './NoCart'
import { Link } from 'react-router-dom'
const Cart = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state)=>state.cart)
    const {isAuthenticated} = useSelector((state)=>state.user)
    var ShippingPrice = 60
    const totalprice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const increaseQuantity =(id,quantity,stock)=>{
        let newQuantity = quantity + 1
        if(stock <= quantity) {
            return;
        }
        dispatch(addtoCart(id,newQuantity))
    }
    const decreaseQuantity =(id,quantity,stock)=>{
      let newQuantity = quantity - 1
      if(1 >= quantity) {
          return;
      }
      dispatch(addtoCart(id,newQuantity))
  }

  const deleteCartItems =(id)=> {
     dispatch(removeItemsFromCart(id))
  }

  const checkoutHandler =()=>{
    window.location.href = "/shipping"
  }
  return (
    <>
    
    {
      cartItems.length===0 ? <NoCart /> : (
        <div class="h-screen bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-4xl font-bold">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        {
            cartItems && cartItems.map((item,i)=>(
                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={item.image} key={i} alt="product-image" class="w-70 h-48 rounded-lg sm:w-100" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-2 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">{item.name}</h2>
              
              <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <button onClick={()=>decreaseQuantity(item.product,item.quantity,item.stock)}  class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min="1" />
                <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm font-bold">&#8377;{item.price * item.quantity}</p>
                <button onClick={()=>deleteCartItems(item.product)} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg></button>
              </div>
            </div>
            </div>
            
          </div>
        </div>
            ))
        }
        
      </div>
      {/*Summary Page*/}
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <p class=" text-xs text-gray-700 text-center">Shipping Free for Orders Above 2000</p>
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">&#8377;{totalprice
}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">&#8377;{totalprice > 2000 ? ShippingPrice=0 : ShippingPrice}</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">&#8377;{totalprice+ShippingPrice}</p>
            <p class="text-sm text-gray-700">including GST</p>
            
          </div>
        </div>
        {
          isAuthenticated ? <div class="flex">
          <Link
            to="/shipping"
            class="flex-grow mt-6 rounded-md bg-blue-500 py-1.5 text-center font-medium text-blue-50 hover:bg-blue-300"
          >
            Check out
          </Link>
        </div> : (
             <div class="flex">
             <Link
               to="/login"
               class="flex-grow mt-6 rounded-md bg-blue-500 py-1.5 text-center font-medium text-blue-50 hover:bg-blue-300"
             >
              Please Login to Check out
             </Link>
           </div>
          )
        }
      </div>
    </div>
  </div>
      )
    }
    </>
  )
}

export default Cart