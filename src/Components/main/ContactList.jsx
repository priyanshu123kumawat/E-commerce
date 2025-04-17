import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
// import { json } from 'react-router-dom'


const ContactList = () => {

  const [contactData, setcontactData] = useState([])

  const getAllContacts = async () => {
    fetch("http://localhost:2000/api/contact/view-all-contact",)
      .then(async res => {
        const data = await res.json();
        setcontactData(data.data)

        return data;
      })
      .then(json => console.log(json))
  }

  useEffect(() => {
    getAllContacts();
  }, [])


  return (
    <div className='container'>
      <div className='container'>
        <h1>Contact List</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {
            contactData && contactData.map((element, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.mobile}</td>
                <td>{element.discription}</td>
                {/* <td>@fat</td> */}

              </tr>
            ))
          }

        </tbody>
      </Table>
    </div>
  );
}



export default ContactList