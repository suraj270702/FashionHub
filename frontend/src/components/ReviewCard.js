import React from 'react'
import ReactStars from 'react-rating-stars-component'
import './productDetails.css'
const ReviewCard = ({review}) => {
  const options ={
    edit : false,
    value : review.rating,
    isHalf : true
  }
  return (
    <>
    <div className='review-card'>
       <img src='https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png' alt='user' />
       <p>{review.name}</p>
       <ReactStars {...options} />
       <span>{review.comment}</span>
    </div>
    </>
  )
}

export default ReviewCard