import React, { useState } from 'react'
import "./CategoryAdd.css";
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';



const CategoryAdd = () => {

  const { catId } = useParams();

  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [Feature, setFeature] = useState("");




  const userToken = localStorage.getItem('token');

  const handleChooseFile = (event) => {
    let name = event.target.name;
    let value = event.target.files[0];
    setImage(value);

  }


  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", image);
    formData.append("token", userToken)




    axios.post('http://localhost:2000/api/category/add-category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        // console.log(response);
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

        navigate("/");



      })
      .catch((error) => {
        console.log('error', 'error'.message);


      })



  };




  return (


    <div class="container2">
      <form id="contact" action="" method="post" onSubmit={handleSumbit}>
        <h3>ADD CATEGORY</h3>

        <fieldset>
          <input placeholder="categoryname" type="text" tabindex="1" required autofocus onChange={(e) => setCategory(e.target.value)} value={category} />
        </fieldset>

        <fieldset>
          <input type="file" name="image" accept='image/*' required onChange={handleChooseFile} />

          {/* <input type="file" required onChange={(e) => setImage(e.target.files[0])} /> */}

        </fieldset>

        <label htmlFor="image">Category status :</label>
        <div className='pro_feature' onChange={(e) => setStatus(e.target.value)}>
          <input type="radio" value="Y" name="status" /> <h3>Yes</h3>
          <input type="radio" value="N" name="status" /> <h3>No</h3>
        </div>

        <label htmlFor="image">Category is feature :</label>
        <div className='pro_feature' onChange={(e) => setFeature(e.target.value)}>
          <input type="radio" value="Y" name="feature" /> <h3>Yes</h3>
          <input type="radio" value="N" name="feature" /> <h3>No</h3>
        </div>

        <fieldset>
          <textarea placeholder="Type your Message Here...." tabindex="5" required></textarea>
        </fieldset>
        <fieldset>
          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
        </fieldset>
      </form>


    </div>
  )
}

export default CategoryAdd