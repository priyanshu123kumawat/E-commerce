import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';



const GalleryAdd = () => {

  const [galleryName, setgalleryName] = useState("");
  const [galleryImage, setgalleryImage] = useState("");
  const [status, setStatus] = useState("");





  // const userToken = localStorage.getItem('token');

  const handleChooseFile = (event) => {
    let name = event.target.name;
    let value = event.target.files[0];
    setgalleryImage(value);

  }


  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("galleryImage", galleryImage);
    // formData.append("token", userToken)




    axios.post('http://localhost:2000/api/gallery/add-gallery', formData, {
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
        <h3>ADD Gallery</h3>

        <fieldset>
          <input placeholder="galleryName" type="text" tabindex="1" required autofocus onChange={(e) => setgalleryName(e.target.value)} value={galleryName} />
        </fieldset>

        <fieldset>
          <input type="file" name="galleryImage" accept='image/*' required onChange={handleChooseFile} />

          {/* <input type="file" required onChange={(e) => setImage(e.target.files[0])} /> */}

        </fieldset>

        <label htmlFor="image">Slider status :</label>
        <div className='pro_feature' onChange={(e) => setStatus(e.target.value)}>
          <input type="radio" value="Y" name="status" /> <h3>Yes</h3>
          <input type="radio" value="N" name="status" /> <h3>No</h3>
        </div>

          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Add</button>
        
      </form>


    </div>
  )
}

export default GalleryAdd