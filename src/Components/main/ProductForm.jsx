import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "./ProductForm.css";
import axios from "axios";

const Productform = () => {
  const [product_name, setproduct_name] = useState("");
  const [image, setimage] = useState("");
  const [price, setprice] = useState("");
  const [categoryId, setcategoryId] = useState('');
  const [rating, setRating] = useState("");
  const [details, setdetails] = useState("");
  const [catList, setCatList] = useState([]);
  const [files, setFiles] = useState([]);

  // console.log(product_name, image, price, categoryId, addedBy, currency, details);

  const oninputFilesChange = (e) => {
    setFiles(e.target.files)
  };

  const getCategoryList = async () => {
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
    getCategoryList();
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



    const formData = new FormData();
                      //api          usestate
    formData.append("product_name", product_name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("details", details);
    formData.append("rating", rating);

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }


    axios.post('http://localhost:2000/api/products/add-products', formData, {
      headers: {
        'authorization': userToken
      }
    })
      .then(function (response) {
        console.log(response);
        if (response.success) {
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
        getCategoryList();
        navigate("/");
         
      })

      .catch((error) => {
        console.log('error', 'error'.message);
      })




  };




  return (

    <div class="container2">
      <form id="contact2" action="" method="post" onSubmit={handleSumbit}>
        <h3 style={{color:"black"}}>ADD PRODUCT</h3>
        {/* <h4>Contact us today, and get reply with in 24 hours!</h4> */}
        <fieldset>
          <input placeholder="productName" type="text" tabindex="1" required autofocus onChange={(e) => setproduct_name(e.target.value)} />
        </fieldset>



        <fieldset>
          <input  style={{height:"30px",width:"100%"}} className="Price" placeholder="productprice" type="number" tabindex="1" required autofocus onChange={(e) => setprice(e.target.value)} />
        </fieldset>

        <fieldset>
          {/* <input className="cat" placeholder="categoryId" required autofocus onChange={(e) => setcategoryId(e.target.value)} /> */}
          <select name="" id="" onChange={(e) =>
            setcategoryId(e.target.value)} required  >
            <option value="" key={23}>--select category</option>

            {
              catList && catList.map((element, index) => (
                <option value={element._id} key={index}>{element.category}</option>

              ))
            }
          </select>
        </fieldset>

        <fieldset>
          <input  style={{height:"30px",width:"100%"}} placeholder="Rating" className="rat" type="number" tabindex="1" required autofocus onChange={(e) => setRating(e.target.value)} />
        </fieldset>

        <fieldset>
          <input type="file" name="image" accept='image/*' required onChange={oninputFilesChange} multiple />

        </fieldset>

        <fieldset>
          <textarea placeholder="Details...." tabindex="5" required onChange={(e) => setdetails(e.target.value)}></textarea>
        </fieldset>






        <fieldset>
          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
        </fieldset>
      </form>


    </div>

  );
};
export default Productform;

