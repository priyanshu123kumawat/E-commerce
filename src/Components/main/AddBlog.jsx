import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';



const AddBlog = () => {

  const [blogName, setblogName] = useState("");
  const [blogUrl, setblogUrl] = useState("");
  const [status, setStatus] = useState("");





  // const userToken = localStorage.getItem('token');



  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();

const blogData={
    blogName:blogName,
    blogUrl:blogUrl
}




    axios.post('http://localhost:2000/api/blog/add-blog', blogData, {

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
        <h3>ADD Blog</h3>

        <fieldset>
          <input placeholder="blogName" type="text" tabindex="1" required autofocus onChange={(e) => setblogName(e.target.value)} value={blogName} />
        </fieldset>

        <fieldset>
        <input placeholder="blogUrl" type="text" tabindex="1" required autofocus onChange={(e) => setblogUrl(e.target.value)} value={blogUrl} />


        </fieldset>

        

          <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Add Blog</button>
        
      </form>


    </div>
  )
}

export default AddBlog