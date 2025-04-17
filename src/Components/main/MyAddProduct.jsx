import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import "./MyAddProduct.css"

const MyAddProduct = () => {



    const [productName, setproductName] = useState("");
    const [productImage, setproductImage] = useState("");
    const [productPrice, setproductPrice] = useState("");
    const [categoryId, setcategoryId] = useState('');
    const [rating, setRating] = useState("");
    const [count, setcount] = useState("");
    const [subcategoryId, setsubcategoryId] = useState("");
    const [discription, setdiscription] = useState("");
    const [addedBy, setaddedBy] = useState("");
    const [status, setStatus] = useState("");
    const [isSpecial, setisSpecial] = useState("");

    const [catList, setCatList] = useState([]);
    const [subcatList, setsubCatList] = useState([]);

    // const [files, setFiles] = useState([]);

    // console.log(product_name, image, price, categoryId, addedBy, currency, details);


    const getProductList = async () => {
        axios.get("http://localhost:2000/api/category/find-category",)
            .then((response) => {
                console.log('categorylist', response.data.data);
                setCatList(response.data.data)

            })
            .catch((error) => {
                console.log('error in categorylist', error.message);

            })
    }
    useEffect(() => {
        getProductList();
    }, [])


    const getsubProductList = async () => {
        axios.get("http://localhost:2000/api/subcategory/find-subcategory",)
            .then((response) => {
                console.log('categorylist', response.data.data);
                setsubCatList(response.data.data)

            })
            .catch((error) => {
                console.log('error in categorylist', error.message);

            })
    }
    useEffect(() => {
        getsubProductList();
    }, [])


    const userToken = localStorage.getItem('token');



    // const handleChooseFile = (event) => {
    //   let name = event.target.name;
    //   let value = event.target.files[0];
    //   setimage(value);
    //   // console.log(name);

    // }


    const navigate = useNavigate();
    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!productName) {
            toast.error("Please enter the productname", {
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
            return
        }
        if (!categoryId) {
            toast.error("Please select the category", {
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

            return
        }
        if (!subcategoryId) {
            toast.error("Please select the subcategory", {
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

            return
        }
        if (!productImage) {
            toast.error("Please choose the image", {
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

            return
        }
        if (!count) {
            toast.error("Please enter the count", {
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

            return
        }
        if (!productPrice) {
            toast.error("Please enter the price", {
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

            return
        }
        if (!discription) {
            toast.error("Please enter the discription", {
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

            return
        }
        if (!rating) {
            toast.error("Please enter the rating", {
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

            return
        }
        if (!status) {
            toast.error("Please choose the status", {
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

            return
        }
        if (!isSpecial) {
            toast.error("Please choose the isSpecial", {
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

            return
        }

        const formData = new FormData();
        //api        usestate
        formData.append("productName", productName);
        formData.append("productImage", productImage);
        formData.append("productPrice", productPrice);
        formData.append("categoryId", categoryId);
        formData.append("discription", discription);
        formData.append("rating", rating);
        formData.append("count", count);
        formData.append("addedBy", addedBy);
        formData.append("status", status);
        formData.append("isSpecial", isSpecial);
        formData.append("subcategoryId", subcategoryId);



        axios.post('http://localhost:2000/api/myproducts/add-myproducts', formData, {
            headers: {
                'authorization': userToken
            }
        })
            .then(function (response) {
                console.log("response", response);
                if (response.success) {
                    navigate("/my-add-product-list");

                    toast.success(response.message, {
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
                }

            })

            .catch((error) => {
                console.log('error', 'error'.message);
            })




    };


    return (
        <div class="formbold-main-wrapper">

            <div class="formbold-form-wrapper">
                <form onSubmit={handleSumbit} action="https://formbold.com/s/FORM_ID" method="POST">
                    <div class="formbold-form-title">
                        <h2 class="" style={{ textAlign: "center", marginTop: '10px' }}> MY ADD PRODUCT</h2>

                    </div>
                    <div class="formbold-mb-5">
                        <label for="name" class="formbold-form-label" style={{ marginLeft: "10px" }}>   Product Name </label>
                        <input
                            type="text"
                            name="name"
                            id="name"

                            placeholder="Product Name"
                            class="formbold-form-input"
                            onChange={(e) => setproductName(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <div  style={{ marginLeft:"20px"}}>
                            <select name="" id="" onChange={(e) =>
                                setcategoryId(e.target.value)} >
                                <option value="" key={23}>--Select Category</option>

                                {
                                    catList && catList.map((element, index) => (
                                        <option value={element._id} key={index}>{element.category}</option>

                                    ))
                                }
                            </select>
                        </div>

                        <div style={{ marginLeft:"100px"}}>
                            <select name="" id="" onChange={(e) =>
                                setsubcategoryId(e.target.value)} >
                                <option value="" key={23}>--Select Subcategory</option>

                                {
                                    subcatList && subcatList.map((element, index) => (
                                        <option value={element._id} key={index}>{element.name}</option>

                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <fieldset>
                        {/* <input type="file" name="image" accept='image/*' style={{ marginLeft: "15px", marginTop: "5px" }} onChange={(e)=>setFiles(e.target.files[0])} /> */}

                        <input type="file" accept='image/*' style={{ marginLeft: "15px", marginTop: "5px" }} onChange={(e) => setproductImage(e.target.files[0])} />

                    </fieldset>

                    <div class="flex flex-wrap formbold--mx-3">
                        <div class="w-full sm:w-half formbold-px-3">
                            <div class="formbold-mb-5 w-full">

                                <label for=" Product count" class="formbold-form-label" style={{ marginLeft: "10px" }}> Product Count </label>
                                <input

                                    type="tel"
                                    maxlength="4"
                                    class="formbold-form-input"
                                    onChange={(e) => setcount(e.target.value)}
                                />

                            </div>
                        </div>
                        <div class="w-full sm:w-half formbold-px-3">
                            <div class="formbold-mb-5">
                                <label for=" Product price" class="formbold-form-label" style={{ marginLeft: "10px" }}> Product Price </label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    value={productPrice}
                                    class="formbold-form-input"
                                    onChange={(e) => setproductPrice(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                    <div class="formbold-mb-5 formbold-pt-3">

                        <div class="formbold-mb-5">
                            <label for="Description" class="formbold-form-label" style={{ marginLeft: "10px" }}>
                                Description
                            </label>
                            <input
                                type="text"
                                name="address"

                                id="address"
                                class="formbold-form-input"
                                onChange={(e) => setdiscription(e.target.value)}
                            />
                        </div>
                        <div class="formbold-mb-3">
                            <label for="Product rating" class="formbold-form-label" style={{ marginLeft: "10px" }}>
                                Product Rating
                            </label>
                            <input
                                type="tel"
                                maxlength="1"
                                class="formbold-form-input"
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </div>


                    </div>
                    <div style={{ display: "flex" }}>
                        <label htmlFor="image" > Status :</label>
                        <div className='pro_feature' style={{ marginLeft: "20px" }}>
                            <input type="radio" value="Y" name="status" onChange={(e) => setStatus(e.target.value)} checked={status && status == 'Y'} /> <h3>Yes</h3>
                            <input type="radio" value="N" name="status" onChange={(e) => setStatus(e.target.value)} checked={status && status == 'N'} /> <h3>No</h3>
                        </div>

                        <label htmlFor="image" style={{ marginLeft: "70px" }}> is Special :</label>
                        <div className='pro_feature' style={{ marginLeft: "20px" }}>
                            <input type="radio" value="Y" name="feature" onChange={(e) => setisSpecial(e.target.value)} checked={isSpecial && isSpecial == 'Y'} /> <h3>Yes</h3>
                            <input type="radio" value="N" name="feature" onChange={(e) => setisSpecial(e.target.value)} checked={isSpecial && isSpecial == 'N'} /> <h3>No</h3>
                        </div>
                    </div>
                    <div>
                        <button class="formbold-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div >



    )
}

export default MyAddProduct