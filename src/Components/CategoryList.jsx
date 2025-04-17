import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { MdEdit } from "react-icons/md";
import { FaToggleOff } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";





// import { json } from 'react-router-dom'


const CategoryList = () => {

  const [CategoryData, setCategoryData] = useState([])
  const token = localStorage.getItem("token");

  const getAllCategory = async () => {
    fetch("http://localhost:2000/api/category/find-category",)
      .then(async res => {
        const data = await res.json();
        // console.log(data);//console m categorydata name se data nikl rha h 
        setCategoryData(data.data)

        return data;
      })
      .then(json => console.log(json))
  }

  useEffect(() => {
    getAllCategory();
  }, [])



  const UpdateFeature = async (id) => {
    try {
      axios.post(`http://localhost:2000/api/category/update-category?_id=${id}`).then(async (response) => {
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
        await getAllCategory;



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


  const deleteCategory = async (id) => {
    try {
      axios.post(`http://localhost:2000/api/category/delete-category?_id=${id}`).then(async (response) => {
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
        await getAllCategory();



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


  



  // const UpdateCategory = async (id) => {
  //   try {
  //     axios.post(`http://localhost:2000/api/category/update-category?_id=${id}`).then(async (response) => {
  //       console.log(response);
  //       toast.success(response.data.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       })
  //       await getAllCategory()

  //       // alert('Changed product status=>>>>');
  //       //  await fetchProductData()

  //     }).catch((error) => {
  //       toast.success(error.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       })

  //     })
  //   } catch (error) {
  //     toast.success(error.message, {
  //       position: "top-center",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });

  //   }
  // }



  // const UpdateCategory = async (id) => {
  //   try {
  //     axios.post(`http://localhost:2000/api/category/update-category?_id=${id}`).then(async (response) => {
  //       console.log(response);
  //       toast.success(response.data.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       })
  //       await getAllCategory()

  //       // alert('Changed product status=>>>>');
  //       //  await fetchProductData()

  //     }).catch((error) => {
  //       toast.success(error.message, {
  //         position: "top-center",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       })

  //     })
  //   } catch (error) {
  //     toast.success(error.message, {
  //       position: "top-center",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });

  //   }
  // }





  return (
    <div className='container'>
      <div className='container'>
        <h1>Category  List</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Feature</th>
            <th>Action</th>


          </tr>
        </thead>
        <tbody>
          {
            CategoryData && CategoryData.map((element, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{element.category}</td>
                <td className='addproductcss'><img src={element.image} alt={element.category} /></td>
                <td>{element.status}</td>
                <td>
                  {
                    element.isFeature && element.isFeature == 'Y' ? (<IoIosEye style={{marginLeft:"10px"}} onClick={() => UpdateFeature(element._id)} />
                    ) :

                      (<IoIosEyeOff onClick={() => UpdateFeature(element._id)} />)
                  }

                </td>
                <td>
                  <FaRegTrashAlt style={{color:"red"}} onClick={() => deleteCategory(element._id)} />



                  <Link to={`/edit-category/${element._id}`}>
                    <MdEdit style={{ color: "black", marginLeft: "10px" }} />
                  </Link>
                </td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    </div>
  );
}



export default CategoryList