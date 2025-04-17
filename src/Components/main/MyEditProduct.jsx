import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./MyEditProduct.css"

const MyEditProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [discription, setDiscription] = useState('');
    const [productImage, setProductImage] = useState('');
    const [rating, setRating] = useState('');
    const [count, setCount] = useState('');
    const [isSpecial, setisSpecial] = useState('');
    const [status, setStatus] = useState('');
    const [catData, SetCatData] = useState([]);
    const [MyList, SetMyList] = useState({});
    const [subCatData, SetSubCatData] = useState([]);

    const navigate=useNavigate();
    // console.log('MyList',MyList);

    const FindSubCatList = () => {
        axios.get('http://localhost:2000/api/subcategory/find-subcategory').then((response) => {
            // console.log(response);
            SetSubCatData(response.data.data)
        }).catch((error) => {
            console.log(error);

        })
    }


    const FindCatList = () => {
        axios.get('http://localhost:2000/api/category/find-category').then((response) => {
            // console.log(response.data.data);
            SetCatData(response.data.data)
        }).catch((error) => {
            console.log(error);

        })
    }

    const { myId } = useParams()
    const MyProductList = async (id) => {
        axios.get(`http://localhost:2000/api/myproducts/find-myproducts?_id=${id}`).then((response) => {
            console.log(response.data.product.subcategoryId._id);
            SetMyList(response.data.product);
            setProductName(response.data.product.productName);
            setDiscription(response.data.product.discription);
            setProductPrice(response.data.product.productPrice);
            setRating(response.data.product.rating);
            setCategoryId(response.data.product.categoryId._id);
            setSubcategoryId(response.data.product.subcategoryId._id);
            setCount(response.data.product.count);
            setProductImage(response.data.product.productImage);
            setisSpecial(response.data.product.isSpecial);
            setStatus(response.data.product.status);



        }).catch((error) => {
            console.log(error.message);

        })
    }

    useEffect(() => {
        FindCatList();
        FindSubCatList();
        MyProductList(myId)
    }, [myId])



    const useToken = localStorage.getItem('token')
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('token', useToken);
        formData.append('productName', productName);
        formData.append('discription', discription);
        formData.append('productPrice', productPrice);
        formData.append('rating', rating);
        formData.append('categoryId', categoryId);
        formData.append('subcategoryId', subcategoryId);
        formData.append('count', count);
        formData.append('productImage', productImage);
        formData.append('isSpecial', isSpecial);
        formData.append('status', status);
        formData.append('_id', myId);





        axios.post(`http://localhost:2000/api/myproducts/update-myproducts`, formData, {
            headers: {
                'authorization': useToken
            }
        }).then(async (response) => {
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
            });

            await MyProductList(myId);

        }).catch((error) => {
            console.log(error);
            toast.error(error.message, {
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

        })
     
        navigate('/my-add-product-list')

    }

    return (
        // <div className="form-container">
        //     <h2 className="form-title"> My Edit Products</h2>
        //     <form className="product-form" onSubmit={handleSubmit} encType='multiPart/form-data'>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Name:
        //                 <input
        //                     type="text"
        //                     name="productName"
        //                     onChange={(e) => setProductName(e.target.value)}
        //                     value={productName}

        //                     className="form-input"
        //                     required
        //                 />
        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Category:
        //                 {/* <input
        //             type="text"
        //             name="productCategory"                 
        //             className="form-input"
        //             required
        //           /> */}
        //                 <select name="" id="" onChange={(e) => setCategoryId(e.target.value)} value={categoryId} >
        //                     <option value="">Select Product Category</option>
        //                     {catData && catData.map((element, index) => (
        //                         <option value={element.categoryId} key={index + 1}>{element.category}</option>
        //                     ))}
        //                 </select>
        //             </label>
        //         </div>
        //         <div className="form-group" >
        //             <label className="form-label">
        //                 Product Subcategory:
        //                 {/* <input
        //             type="text"
        //             name="productSubcategory"


        //             className="form-input"
        //           /> */}
        //                 <select name="" id="" onChange={(e) => setSubcategoryId(e.target.value)} value={subcategoryId}>
        //                 <option value="">Select Product  SubCategory</option>
        //                     {subCatData && subCatData.map((element, index) => (
        //                         <option value={element.subcategoryId} key={index + 1}>{element.name}</option>
        //                     ))}
        //                 </select>
        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Price:
        //                 <input
        //                     onChange={(e) => setProductPrice(e.target.value)}
        //                     value={productPrice}
        //                     type="number"
        //                     name="productPrice"


        //                     className="form-input"
        //                     required
        //                 />
        //             </label>
        //         </div>
        //         <div className="form-group" >
        //             <label className="form-label">
        //                 Product Description:
        //                 <textarea
        //                     name="productDescription"
        //                     className="form-textarea"
        //                     onChange={(e) => setDiscription(e.target.value)}
        //                     value={discription}
        //                 />
        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Image:
        //                 <input
        //                     onChange={(e) => setProductImage(e.target.files[0])}

        //                     type="file"
        //                     name="productImage"
        //                     accept='image/'

        //                     className="form-input"
        //                 />
        //                 {
        //                     MyList && (
        //                         <img src={MyList.productImage} alt="" style={{ width: '10%' }} />
        //                     )
        //                 }

        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Rating:
        //                 <input
        //                     onChange={(e) => setRating(e.target.value)}
        //                     value={rating}
        //                     size="5"
        //                     type="number"
        //                     maxLength="5"
        //                     name="productRating"


        //                     className="form-input"
        //                     min="1"
        //                     max="5"
        //                     step="0.1"
        //                 />
        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Product Count:
        //                 <input
        //                     onChange={(e) => setCount(e.target.value)}
        //                     value={count}
        //                     type="number"
        //                     name="productCount"


        //                     className="form-input"
        //                     min="0"
        //                 />
        //             </label>
        //         </div>
        //         <div className="form-group" onChange={(e) => setisSpecial(e.target.value)}
        //             value={isSpecial}>
        //             <label className="form-label">
        //                 Is Special:
        //                 <input

        //                     type="radio"
        //                     value='Y'
        //                     checked={isSpecial && isSpecial == 'Y' && true}
        //                     name="isSpecial"


        //                     className="form-checkbox"
        //                 />Y

        //                 <input

        //                     type="radio"
        //                     value='N'
        //                     checked={isSpecial && isSpecial == 'N' && true}
        //                     name="isSpecial"


        //                     className="form-checkbox"
        //                 />N
        //             </label>
        //         </div>
        //         <div className="form-group">
        //             <label className="form-label">
        //                 Status:
        //                 <select
        //                     onChange={(e) => setStatus(e.target.value)} value={status}
        //                     name="status"


        //                     className="form-select"
        //                 >
        //                     <option value="--Select-one--">select</option>
        //                     <option value="Y">Y</option>
        //                     <option value="N">N</option>
        //                 </select>
        //             </label>
        //         </div>
        //         <button type="submit" className="form-button">Submit</button>
        //     </form>
        // </div>

        <div class="formbold-main-wrapper">

            <div class="formbold-form-wrapper">
                <form onSubmit={handleSubmit} action="https://formbold.com/s/FORM_ID" method="POST">
                    <div class="formbold-form-title">
                        <h2 class="" style={{ textAlign: "center", marginTop: '10px' }}> My Edit Products</h2>

                    </div>
                    <div class="formbold-mb-5">
                        <label className="form-label" style={{marginLeft:"10px",width:"500px"}}>
                            Product Name:
                            <input
                                type="text"
                                name="productName"
                                onChange={(e) => setProductName(e.target.value)}
                                value={productName}

                                className="form-input"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="form-label"  style={{marginLeft:"10px",width:"500px"}} >
                            Product Category:
                          
                            <select name="" id="" onChange={(e) => setCategoryId(e.target.value)} value={categoryId} >
                                {/* <option value="">Select Product Category</option> */}
                                {catData && catData.map((element, index) => (
                                    <option value={element._id}  selected={categoryId==element._id ? true:false}
                                     key={index + 1}
                                   >{element.category}
                                   </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="form-label"  style={{marginLeft:"10px",width:"500px"}}>
                            Product Subcategory:
                           
                            <select name="" id="" onChange={(e) => setSubcategoryId(e.target.value)} value={subcategoryId}>
                                
                                {subCatData && subCatData.map((element, index) => (
                                    <option value={element._id}
                                    selected={subcategoryId==element._id ? true:false} key={index + 1}>{element.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <fieldset>
                        <label className="form-label" style={{marginLeft:"10px"}}>
                         Product Image:
                         <input
                                onChange={(e) => setProductImage(e.target.files[0])}

                                type="file"
                                name="productImage"
                                accept='image/'

                                className="form-input"
                            />
                            {
                                MyList && (
                                    <img src={MyList.productImage} alt="" style={{ width: '10%' }} />
                                )
                            }

                        </label>



                    </fieldset>

                    <div class="flex flex-wrap formbold--mx-3">
                        <div class="w-full sm:w-half formbold-px-3">
                            <div class="formbold-mb-5 w-full">

                                <label className="form-label" style={{marginLeft:"10px"}}>
                                    Product Count:
                                    <input
                                        onChange={(e) => setCount(e.target.value)}
                                        value={count}
                                        type="number"
                                        name="productCount"
                                        className="form-input"
                                        min="0"
                                    />
                                </label>

                            </div>
                        </div>
                        <div class="w-full sm:w-half formbold-px-3">
                            <div class="formbold-mb-5">
                                <label className="form-label" style={{marginLeft:"10px"}}>
                                    Product Price:
                                    <input
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        value={productPrice}
                                        type="number"
                                        name="productPrice"


                                        className="form-input"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>


                    <div class="formbold-mb-5 formbold-pt-3">

                        <div class="formbold-mb-5">
                            <label className="form-label"  style={{marginLeft:"10px",width:"500px"}}>
                                Product Description:
                                <textarea
                                    name="productDescription"
                                    className="form-textarea"
                                    onChange={(e) => setDiscription(e.target.value)}
                                    value={discription}
                                />
                            </label>
                        </div>
                        <div class="formbold-mb-3">
                            <label className="form-label"  style={{marginLeft:"10px",width:"500px"}}>
                         Product Rating:
                         <input
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="5"
                                    type="number"
                                    maxLength="5"
                                    name="productRating"


                                    className="form-input"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                />
                            </label>
                        </div>


                    </div>

                    <div className="form-group" onChange={(e) => setisSpecial(e.target.value)}
                    value={isSpecial} >
                    <label className="form-label"  style={{marginLeft:"10px",width:"500px"}}>
                        Is Special:
                        <input

                            type="radio"
                            value='Y'
                            checked={isSpecial && isSpecial == 'Y' && true}
                            name="isSpecial"


                            className="form-checkbox"
                        />Y

                        <input

                            type="radio"
                            value='N'
                            checked={isSpecial && isSpecial == 'N' && true}
                            name="isSpecial"


                            className="form-checkbox"
                        />N
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label"  style={{marginLeft:"10px"}}>
                        Status:
                        <select
                            onChange={(e) => setStatus(e.target.value)} value={status}
                            name="status"


                            className="form-select"
                        >
                            <option value="--Select-one--">select</option>
                            <option value="Y">Y</option>
                            <option value="N">N</option>
                        </select>
                    </label>
                </div>

                    <div>
                        <button class="formbold-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div >


    )

}


export default MyEditProduct