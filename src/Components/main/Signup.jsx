import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  // console.log([name,email,mobile,password]);
 

  const handleFormSumbit = async (event) => {
    event.preventDefault();

    const rawResponse = await fetch(
      "http://localhost:2000/api/user/registration",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, password }),
      }
    );
    const content = await rawResponse.json();
    if (content.success) {
      toast.success(content.message);
      navigate("/signin")
    } else {
      toast.error(content.message);
    }
  };
  return (
    <div className="form_box">
      <div className="form">
        <form onSubmit={handleFormSumbit} method="post" action="#">
          <div className="Form_container">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
            <br />
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            <br />
            <label htmlFor="mobile">Mobile</label>
            <br />
            <input
              type="mobile"
              onChange={(e) => setMobile(e.target.value)}
              required
              value={mobile}
            />
            <br />
            <div className="login_button" align="right">
              <div className="buttons" align="right">
                <button type="submit">SignUp</button>
              </div>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="cookies"
                name="cookies"
                value="cookies"
              />
              Accept all cookies & conditions
            </div>
            <h4 className="color_h4">
              <i className="fa-solid fa-check"></i> Please accept all conditions
              and cookies to look forword.
            </h4>

            <div className="forgotPass">
              I am already a member! <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;