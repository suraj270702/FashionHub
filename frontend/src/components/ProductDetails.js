import React from 'react'
import './Newproductdetails.css'
const ProductDetails = () => {
  
  return (
    <section id="product-details" className='section-p1'>
      <div className='single-pro-image'>
         <img src='https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847'  alt='' />
         <div className='small-image-group'>
           <div className='small-image-col'>
             <img src='https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847' className='small-image'  alt='' />
           </div>
           <div className='small-image-col'>
             <img src='https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847' className='small-image'  alt='' />
           </div>
           <div className='small-image-col'>
             <img src='https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847' className='small-image'  alt='' />
           </div>
           <div className='small-image-col'>
             <img src='https://www.snitch.co.in/cdn/shop/products/Snitch_Jan21_-1384_1800x1800.jpg?v=1688537847' className='small-image'  alt='' />
           </div>
         </div>
      </div>
      <div className='single-product-details'>
         <h2 className='text-2xl font-bold text-gray-900 sm:pr-12'>Catgegory Name</h2>
         <h3 className='text-2xl font-bold text-gray-900 sm:pr-12'>MASAI LION BLACK SHIRT</h3>
         <h3 className='text-2xl font-bold text-gray-900 sm:pr-12'>&#8377; 1099</h3>
         <select>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          
         </select>
         <input type='number' value="1" />
         <button className='mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Add
         to Cart</button>
         <h4 className='text-2xl font-bold text-gray-900 sm:pr-12' style={{paddingTop : 20}}>
          Product Description
         </h4>
         <span>
         Full Sleeves,Spread Collar,Curved Hem Design,Spare Buttons Included,Embroidery On Front Panel<br></br>
        Occassion to wear : Brunch Wear ,Casual Wear, Weekend Wear ,Club Wear
         </span>
      </div>
    </section>
  )
}

export default ProductDetails