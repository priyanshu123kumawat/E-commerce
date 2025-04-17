import React, { useState,useEffect } from "react";
import "./Signin.css";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie'


const Signin = () => {

    // const [cookies, setCookie] = useCookies(['token'])
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    const handleLogin = async (event) => {
        event.preventDefault();

        const rawResponse = await fetch("http://localhost:2000/api/user/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const response = await rawResponse.json();
        console.log(response); 

        if (response.success == true) {
            const { createdToken } = response;
            const { name, email } = response.isExist;
                                // api  ,  usestate
            localStorage.setItem('token', createdToken);
            localStorage.setItem('firstName', name);
            localStorage.setItem('email', email);
            toast.success('Login successfully');
            navigate('/');
        } else {
            toast.error(response.message);
        }
        console.log(response);
    }

return (
    <div className="form_box">
        <div className="form">
            <form onSubmit={handleLogin} method="post" action="#">
                <div className="Form_container">
                    <label htmlFor="email">E-mail</label>
                    <br />
                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <br />
                    <div className="forgotPass">
                        <a href="#">Forgot password ?</a>
                    </div>
                    <br />
                    <div className="login_button" align="right">
                        <Link to={"/sign-up"}>Sign Up</Link>

                    </div>

                    <div className="buttons" align="center">
                        <button type="submit">Login !</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)
}
export default Signin;