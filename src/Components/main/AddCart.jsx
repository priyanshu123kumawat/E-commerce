import "./AddCart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import React, { useState, useEffect, useContext } from 'react'
import { FaPlus } from "react-icons/fa6";
import { AuthContext } from "../store/auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Payment from "../Payment";





const AddCart = () => {


    const [cartData, setCartData] = useState([])
    const [nextPage, setNextPage] = useState(false)
    const navigate = useNavigate()



    const { addToCart } = useContext(AuthContext);

    const { isLoggedIn, cartItemCounts } = useContext(AuthContext);


    const userToken = localStorage.getItem('token')



    const viewcart = () => {
        axios.get(`http://localhost:2000/api/cart/get-cart`, {
            headers: {
                'authorization': userToken
            }
        }).then(async (response) => {
            console.log("res", response.data.product);                // console.log("res", response.data.product);

            setCartData(response.data.product)
        })
            .catch((error) => {
                console.log(error.response);
            })
    }


    useEffect(() => {
        viewcart();
    }, [])


    // const incress = (id) => {
    //     const userToken = localStorage.getItem('token')
    //     const data = {
    //         productId: id,
    //         symbol: '+'
    //     }

    //     axios.post(`http://localhost:2000/api/cart/add-cart`, data, {
    //         headers: {
    //             "authorization": userToken
    //         }
    //     }).then(async (response) => {
    //         // console.log(" cart", response);
    //         if (response.data.success) {
    //             console.log(response.data);
    //             await viewcart();
    //             return
    //         } else {
    //             // console.log(error.message);
    //             return
    //         }

    //     }).catch((error) => {
    //         console.log(error);

    //     })
    // }

    const incress = async (id) => {

        const userToken = localStorage.getItem('token')
        const payload = {
            productId: id,
            symbol: "+",
        }

        const response = await addToCart(payload);
        if (response.data.success) {
            await viewcart();
            return;
        } else {
            console.log("response.false >>> ", response.data.message);
            return
        }
    }

    const dicress = async (id) => {

        const userToken = localStorage.getItem('token')
        const payload = {
            productId: id,
            symbol: "-",
        }

        const response = await addToCart(payload);
        if (response.data.success) {
            await viewcart();
            return;
        } else {
            console.log("response.false >>> ", response.data.message);
            return
        }
    }

    const handlePayment = async () => {
        setNextPage(true);
    }


    // const totalCount = cartData.reduce((total, item) => total + item.quantity * item.productId.price, 0);

    // const totalQuantity = cartData.reduce((total, item) => total + item.quantity * item.productId.price, 0);


    const totalCount = cartData.reduce((total, item) => {
        // Use optional chaining to safely access properties
        const price = item.productId?.price || 0;  // Default to 0 if price is null or undefined
        return total + (item.quantity * price);
    }, 0);

    const totalQuantity = cartData.reduce((total, item) => {
        return total + (item.quantity || 0);  // Ensure quantity is a valid number
    }, 0);


    return (

        (nextPage) ? (<Payment setNextPage={setNextPage} totalPrice={totalCount} />) : (<div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>Shopping cart</h4>
                        <div class="d-flex flex-row align-items-center pull-right"><span class="mr-1">Sort by:</span><span class="mr-1 font-weight-bold">Price</span><i class="fa fa-angle-down"></i></div>
                    </div>

                    <Table striped bordered hover>
                        <thead >
                            <tr >
                                <th style={{ textAlign: "center" }}>Image</th>
                                <th style={{}}>Name</th>
                                <th style={{}}>Quantity</th>
                                <th style={{}}>Price</th>
                                <th style={{}}>Total</th>


                            </tr>
                        </thead>
                    </Table>


                    {cartData && cartData.map((element, index) => (
                        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div class="mr-1">
                                {/* <img class="rounded" src={`http://localhost:2000/uploads/${element.productId.image}`} width="70" /> */}

                                {/* Check if image exists before trying to render it */}
                                {element.productId?.image ? (
                                    <img className="rounded" src={`http://localhost:2000/uploads/${element.productId.image}`} width="70" alt="Product" />
                                ) : (
                                    <span>No Image</span> // Fallback if image is not found
                                )}
                            </div>
                            <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">{element.productId?.product_name}</span>
                                <div class="d-flex flex-row product-desc">
                                    <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
                                    <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center qty"><FiMinus onClick={() => dicress(element.productId?._id)} style={{ marginRight: "5px", color: "red" }} />
                                <h5 style={{ color: "black" }} class="text-grey mt-1 mr-1 ml-1">{element.quantity}</h5><FaPlus onClick={() => incress(element.productId?._id)} style={{ marginLeft: "5px", color: "green" }} /></div>
                            <div>
                                <h5 class="text-grey">{element.productId?.price}</h5>
                            </div>

                            <div>
                                <h5 class="text-grey">{element.quantity * element.productId?.price}</h5>
                            </div>
                            <div class="d-flex align-items-center"><FaRegTrashAlt style={{ color: "red" }} /></div>
                        </div>
                    ))}

                    <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="text" class="form-control border-0 gift-card" placeholder="Total Amount" /><span style={{ marginRight: '100px' }}>{totalCount}Rs</span></div>
                    <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button" onClick={handlePayment}>Proceed to Pay</button></div>
                </div>
            </div>



        </div>)










    )
}

export default AddCart