import React, { useEffect, useState } from 'react'
import "./ProductDetail.css";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';



const ProductDetail = () => {

  const { id } = useParams();
  const [productDetails, setproductDetails] = useState('')


  const fetchProductByid = async (id) => {
    axios.get(`http://localhost:2000/api/products/find-Products?_id=${id}`)
      .then((response) => {
        if (response.data.success) {
          setproductDetails(response.data.product);
        }
        // console.log('Response=>', response.data.product[0].image);
      })
      .catch((error) => {
        console.log('Error=>', error.message);
      })
  }

  // console.log('tes', productDetails);


  useEffect(() => {
    fetchProductByid(id);
  }, [id])





  return (
    <div className="card-wrapper">
      <div className="card container">
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={productDetails && productDetails.image} alt="Product Display" />
              <img src={productDetails && productDetails.image} alt="Product Display" />
              <img src={productDetails && productDetails.image} alt="Product Display" />
              <img src={productDetails && productDetails.image} alt="Product Display" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <Link to="#" data-id="1">
                <img src={productDetails && productDetails.image} alt="Product Display" />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#" data-id="2">
                <img src={productDetails && productDetails.image} alt="Product Display" />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#" data-id="3">
                <img src={productDetails && productDetails.image} alt="Product Display" />
              </Link>
            </div>
            <div className="img-item">
              <Link to="#" data-id="4">
                <img src={productDetails && productDetails.image} alt="Product Display" />
              </Link>
            </div>
          </div>
        </div>
        <div className="product-content">
          <h2 className="product-title">{productDetails && productDetails.product_name}</h2>
          <Link to="#" className="product-link">visit nike store</Link>
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div className="product-price">
            <p className="last-price">Old Price: <span>${productDetails && productDetails.price}</span></p>
            <p className="new-price">New Price: <span>${productDetails && productDetails.price} (5%)</span></p>
          </div>

          <div className="product-detail">
            <h2>about this item: </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Shoes</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div className="purchase-info">
            <input type="number" min="0" value="1" />
            <button type="button" className="btn">
                          Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
            <button type="button" className="btn">Compare</button>
          </div>

          <div className="social-links">
            <p>Share At: </p>
            <Link to="#">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-whatsapp"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-pinterest"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail