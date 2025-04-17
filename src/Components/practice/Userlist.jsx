import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { FaRegTrashCan } from "react-icons/fa6";
import { Bounce, toast } from "react-toastify";



const Userlist = () => {
  const [userDone, setuserDone] = useState('');


  const getAllContacts = () => {


    axios.get("http://localhost:2000/api/user/getAllUsers")
      .then((response) => {

        // console.log("response", response);
        setuserDone(response.data.users)
      })
      .catch((error) => {
        console.log("error", error);
      })

  }

  useEffect(() => {
    getAllContacts();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.get(`http://localhost:2000/api/user/delete-user?_id=${id}`).then(async (response) => {
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

        await getAllContacts()


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
        <h1>User List</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {userDone &&
            userDone.map((element, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.mobile}</td>
                <td>{element.country}</td>
                <td>{element.state}</td>
                <td>{element.city}</td>
                <td>{element.address}</td>
                <td>{element.gender}</td>

                <td>
                  <FaRegTrashCan onClick={() => deleteUser(element._id)} />



                </td>



              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Userlist;