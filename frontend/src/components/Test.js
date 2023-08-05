import React, { useState, useEffect } from 'react';
import './productDetails.css';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productsActions';

const options = {
  edit: false,
  isHalf: true,
};

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <section id="product-details" className="section-p1">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="single-pro-image">
            {product.images && (
              <img src={product.images[selectedImage].url} alt="" />
            )}
            <div className="small-image-group">
              {
               product.images && product.images.map((image, index) => (
                  <div className="small-image-col" key={image.public_id}>
                    <img
                      src={image.url}
                      key={image.public_id}
                      className="small-image"
                      alt=""
                      onClick={() => setSelectedImage(index)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="single-product-details">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              Category: {product.category}
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {product.name}
            </h3>
            <ReactStars {...options} value={product.rating} />
            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              &#8377; {product.price}
            </h3>
            <select>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <input type="number" value={1} />
            <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
              Status: {product.inStock ? 'In Stock' : 'Out of Stock'}
            </h3>
            <button className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add to Cart
            </button>
            <h4
              className="text-2xl font-bold text-gray-900 sm:pr-12"
              style={{ paddingTop: 20 }}
            >
              Product Description
            </h4>
            <span>{product.description}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default Test;
