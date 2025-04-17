import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { FaToggleOn } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';



const BlogList = () => {



  const [data, setData] = useState([])
  console.log("blog-list",data)
  const fetchBlogData = () => {
    try {

      axios.get("http://localhost:2000/api/blog/find-blog")
        .then((response) => {
          // console.log("reponse",response.data.data);

          setData(response.data.data)
        }
        )
        .catch((error) => {
          console.log("error", error);
        })
    } catch (error) {
      console.log("error", error.message);
    }
  }

  useEffect(() => {
    fetchBlogData();
  }, [])

  const UpdateStatus = async (id) => {
    try {
      axios.get(`http://localhost:2000/api/blog/changestatus?_id=${id}`).then(async (response) => {
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
        await fetchBlogData()

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


    <div className="container">
      <div className="container">
        <h1>Blog List</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Url</th>
            <th>Status</th>
            <th>Action</th>

           
          </tr>
        </thead>
        <tbody>
          {data && data.map((element, index) => (

            <tr>
              <td>{index + 1.}</td>
              <td>{element.blogName}</td>
              <td>{element.blogUrl}</td>

              <td>{element.status}</td>
              <td style={{ display: "table-cell", justifyContent: "space-around", width: "7rem" }}>

                {
                  element.status && element.status === 'Y' ? (<FaToggleOn style={{ fontSize: '26px', width: "1.2rem" }} title='Status On' onClick={() => UpdateStatus(element._id)} />
                  ) : (<FaToggleOff style={{ fontSize: '26px', width: "1.2rem", }} title='Status Off' onClick={() => UpdateStatus(element._id)} />)
                }



              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

export default BlogList