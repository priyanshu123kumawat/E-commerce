import React, { useState, useEffect } from 'react'
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

const EditCategory = () => {

    const { catId } = useParams();
    const [catData, setCatData] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState("");
    const [Feature, setFeature] = useState("");
    const [status, setStatus] = useState("");

    const fetchCategoryById = (id) => {
        try {

            axios.get(`http://localhost:2000/api/category/find-category?_id=${id}`)
                .then((response) => {
                    console.log(response.data.data[0]);

                    setCatData(response.data.data[0]);
                    setCategoryName(response.data.data[0].category);
                    setFeature(response.data.data[0].isFeature);
                    setStatus(response.data.data[0].status);
                })
                .catch((error) => {
                    console.log("error", error);
                })
        } catch (error) {
            console.log("error", error.message);
        }
    }

    useEffect(() => {

        if (catId) {
            fetchCategoryById(catId)
        }
    }, [catId])

    // console.log("categoryImage", categoryImage);


    // const object = {
    //     categoryName,
    //     categoryImage,
    //     Feature
    // }

    const userToken = localStorage.getItem('token');

    // console.log("object", object);

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("token", userToken)
        formData.append("category", categoryName)
        formData.append("image", categoryImage)
        formData.append("isFeature", Feature)
        formData.append("status", status)
        formData.append("_id", catId)




        axios.post("http://localhost:2000/api/category/update-category", formData, {
            headers: {
                'authorization': userToken
            }
        })
            .then((response) => {
                const { data } = response;
                console.log('data', data);

                if (data.success) {
                    toast.success(data.message, {
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
                    fetchCategoryById(catId)
                }
                
                else {
                    toast.error(data.message, {
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
            })
            .catch((error) => {
                console.log(error.message);
                // throw new Error(error.message);
            })
    }

    return (
        <div className="main-pages">
            <center><h1>You are ready to add category.</h1></center>

            <div className="form_boxs">
                <form onSubmit={handleUpdateCategory} method="post" action="#" enctype="multipart/form-data">
                    <div className="product_form">
                        <div className="pro_name pro">
                            <label htmlFor="product">Category Name :-</label><br />
                            <input type="text" required onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                        </div>
                        <div className="pro_image pro">
                            <label htmlFor="image">Category Image :-</label><br />
                            <input type="file" accept='image/*' onChange={(e) => setCategoryImage(e.target.files[0])} />
                            {
                                catData && (
                                    <img src={catData.image} alt='Category Image' />
                                )
                            }
                        </div>
                        <div className="pro_radio pro">
                            <label htmlFor="image">Category status :</label>
                            <div className='pro_feature' onChange={(e) => setStatus(e.target.value)}>
                                <input type="radio" value="Y" checked={status && status == 'Y' && true} name="status" /> <h3>Yes</h3>
                                <input type="radio" value="N" name="status" checked={status && status == 'N' && true} /> <h3>No</h3>
                            </div>
                        </div>
                        <div className="pro_radio pro">
                            <label htmlFor="image">Category is feature :</label>
                            <div className='pro_feature' onChange={(e) => setFeature(e.target.value)}>
                                <input type="radio" value="Y" name="feature" checked={Feature && Feature == 'Y' && true} /> <h3>Yes</h3>
                                <input type="radio" value="N" name="feature" checked={Feature && Feature == 'N' && true} /> <h3>No</h3>
                            </div>
                        </div>


                        <div className="login-button" align="center">

                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditCategory
