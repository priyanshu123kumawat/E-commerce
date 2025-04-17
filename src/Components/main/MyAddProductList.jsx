
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { IoToggleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';


const MyAddProductList = () => {

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

            axios.get("http://localhost:2000/api/myproducts/find-myproducts")
                .then((response) => {

                    // console.log("response", response.data.product);
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
            axios.get(`http://localhost:2000/api/myproducts/changestatus?_id=${id}`).then(async (response) => {
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
                await fetchProductData();

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
            axios.post(`http://localhost:2000/api/myproducts/delete-myproducts?_id=${id}`).then(async (response) => {
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

    const UpdateSpecial = async (id) => {
        try {
            axios.post(`http://localhost:2000/api/myproducts/update-special?_id=${id}`).then(async (response) => {
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
                await fetchProductData();



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
                <h1> My Add Product List</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Added By</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Price</th>
                        <th>Details</th>
                        <th>isSpecial</th>
                        <th>Count</th>
                        <th>Action</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        productData && productData.map((element, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{element.productName}</td>
                                <td className="adminprodutImage">
                                    <img
                                        style={{ width: "20%" }}
                                        title={element.productName}
                                        src={element.productImage}
                                        alt={element.productName}
                                    />
                                </td>

                                <td>{element.addedBy && element.addedBy.name}</td>
                                <td>{element.categoryId && element.categoryId.category}</td>
                                <td>{element.subcategoryId && element.subcategoryId.name}</td>
                                {/* <td>{element.subcategoryId}</td> */}
                                <td>${element.productPrice}</td>
                                <td>{element.discription}</td>
                                <td>
                                    {
                                        element.isSpecial && element.isSpecial == 'Y' ? (<IoIosEye style={{ marginLeft: "10px" }} onClick={() => UpdateSpecial(element._id)} />
                                        ) :

                                            (<IoIosEyeOff onClick={() => UpdateSpecial(element._id)} />)
                                    }

                                </td>
                                <td>{element.count}</td>
                                <td>

                                    <FaRegTrashAlt style={{ color: "red" }} onClick={() => DeleteProduct(element._id)} />

                                    <Link to={`/myedit-Product/${element._id}`}>
                                        <MdEdit style={{ color: "black",  }} />
                                    </Link>

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

export default MyAddProductList