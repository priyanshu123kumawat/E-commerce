import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import { toast,Bounce } from 'react-toastify';



const GalleryList = () => {



  const [data, setData] = useState([])
  const fetchGalleryData = () => {
    try {

      axios.get("http://localhost:2000/api/gallery/find-gallery")
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
    fetchGalleryData();
  }, [])

  const UpdateStatus = async (id) => {
    try {
      axios.get(`http://localhost:2000/api/gallery/changestatus?_id=${id}`).then(async (response) => {
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
        await fetchGalleryData()

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
        <h1>Gallery List</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((element, index) => (

            <tr>
              <td>{index + 1.}</td>
              <td>{element.galleryName}</td>
              <td className='adminprodutImage'><img style={{ width: "20%" }} title={element.galleryName} src={element.galleryImage} alt={element.galleryName} /></td>
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

export default GalleryList