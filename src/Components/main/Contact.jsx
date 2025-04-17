import React, { useState } from "react";
import "./Contact.css";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [discription, setdiscription] = useState("");

  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();

    const rawResponse = await fetch("http://localhost:2000/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, discription }),
    });

    const content = await rawResponse.json();
    console.log(content);

    if (content.success) {
      toast.success(content.message, {
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
      navigate("/");
    } else {
      toast.error(content.message, {
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
  };

  return (
    <div className="form_box">
      <div className="form">
        <form onSubmit={handleSumbit}>
          <div className="Form_container">
            <div className="details">
              <div className="FName">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>
              <div className="Email">
                <label htmlFor="email">E-mail</label>
                <br />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />
              </div>
              <div className="mobile">
                <label htmlFor="number">Mobile No.</label>
                <br />
                <input
                  type="mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  value={mobile}
                />
              </div>

              <div className="descrip">
                <label htmlFor="discription">discription</label>
                <br />
                <textarea
                  type="text"
                  name="discription"
                  id="discription"
                  onChange={(e) => setdiscription(e.target.value)}
                  required
                  value={discription}
                ></textarea>
              </div>
            </div>

            <br />

            <div className="buttons" align="center">
              {/* <Link to={"/contact-table"}>ContactTable</Link> */}
              <button type="submit">Contact </button>
            </div>
          </div>
        </form>
      </div>
    </div>





  );
};
export default Contact;


