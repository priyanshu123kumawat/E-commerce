import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { IoToggleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';


const ProductList = () => {

    const [productData, setproductData] = useState([])
    const token = localStorage.getItem("token");


    // const getAllProduct = async () => {
    //     fetch("http://localhost:2000/api/products/find-Products")
    //         .then(async res => {
    //             const data = await res.json();
    //             // console.log(data.product);
    //             setproductData(data.product)
    //         })
    //         .then(json => console.log(json))
    // }

    // useEffect(() => {
    //     getAllProduct();
    // }, [])

    //  navigate('/');

    const fetchProductData = () => {
        try {

            axios.get("http://localhost:2000/api/products/find-Products")
                .then((response) => {

                    console.log("response", response.data.product);
                    // return false
                    setproductData(response.data.product)
                })
                .catch((error) => {
                    console.log("error", error);
                })
        } catch (error) {
            console.log("error", error.message);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [])

    const UpdateStatus = async (id) => {
        try {
            axios.get(`http://localhost:2000/api/products/changestatus?_id=${id}`).then(async (response) => {
                console.log(response);
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                await fetchProductData()

                // alert('Changed product status=>>>>');
                //  await fetchProductData()

            }).catch((error) => {
                toast.success(error.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })

            })
        } catch (error) {
            toast.success(error.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
    }


    const DeleteProduct = async (id) => {
        try {
            axios.post(`http://localhost:2000/api/products/delete-Products?_id=${id}`).then(async (response) => {
                console.log(response);
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                await fetchProductData()

                // alert('Changed product status=>>>>');
                //  await fetchProductData()

            }).catch((error) => {
                toast.success(error.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })

            })
        } catch (error) {
            toast.success(error.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
    }






    return (
        <div className='container'>
            <div className='container'>
                <h1>Product List</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Name</th>
                        <th>Product id</th>
                        <th>Price</th>
                        <th>Images</th>
                        <th>Action</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        productData && productData.map((element, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{element.product_name}</td>
                                <td>{element._id}</td>
                                <td>{element.price}</td>
                                <td className='addproductcss'><img src={element.image} alt={element.category} /></td>

                              
                                <td>
                                    
                                    <FaRegTrashAlt onClick={() => DeleteProduct(element._id)} />

                                    <MdEdit title='EDIT' />

                                    {
                                        element.status && element.status == 'Y' ? (<IoToggleOutline onClick={() => UpdateStatus(element._id)} />
                                        ) :

                                            (<FaToggleOff onClick={() => UpdateStatus(element._id)} />)
                                    }
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default ProductList