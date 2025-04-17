import React, { useContext } from 'react'
import "./Product.css";
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from 'react-query'
import { AuthContext } from '../store/auth';
import { TailSpin } from 'react-loader-spinner'
import axios from 'axios';
import { toast,Bounce } from 'react-toastify';


const fetchProduct = async () => {
    const response = await fetch('http://localhost:2000/api/products/find-Products');
    if (!response.ok) {
        throw new Error("Network response was not ok !");
    } else {
        return response.json();
    }
}

const Product = () => {

    const navigate = useNavigate()
  
    const { addToCart } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(['getProducts'], fetchProduct)

    // console.log(data);

    if (isLoading) return <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />;

    if (error) {
        return (
            <div>
                Error: {error.message}
            </div>
        )
    }

    const fetchCartData = async (id) => {

        const userToken = localStorage.getItem('token')
        const payload = {
            productId: id,
            symbol: "+",
        }

        const response = await addToCart(payload);
        if (response.data.success) {
            navigate(`/add-cart`)
            return;
        }else {
            console.log("response.false >>> ", response.data.message);
            return
        }
    }

    return (
        <section id="produtPage">
            <div className="container">

                <div className="Product_heading">
                    <h1>Feature your own favoured and Choose your be-loved <i className="fa-regular fa-face-kiss-wink-heart"></i></h1>
                </div>


                <div className="produtFlex">
                    {data && data.product.map((element, index) => (
                        <div className="product">
                            <Link to={`/product-detail/${element._id}`} key={index}>
                                <div className="produtImage">
                                    <img src={element.image} alt="" />
                                </div>
                            </Link>
                            <div className="produtData">
                                <h2>{element.product_name}</h2>
                                <h3>${element.price}</h3>
                                <Link to='' onClick={() => fetchCartData(element._id)}><i className="fa-solid fa-cart-shopping"></i> Add to Cart</Link>
                            </div>
                        </div>

                    ))}
                </div>

            </div>
        </section>
    )
}

export default Product
