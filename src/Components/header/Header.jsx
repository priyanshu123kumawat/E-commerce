import React, { useState, useEffect, useContext } from 'react'
import "./Header.css";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Dropdown } from 'react-bootstrap';
import { IoCartSharp } from "react-icons/io5";
import { AuthContext } from "../store/auth";
import { toast,Bounce } from 'react-toastify';




const Header = () => {

    const { isLoggedIn, logout, hasRole, authData, cartItemCounts } = useContext(AuthContext);

    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);

    const userToken = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');
    const navigate = useNavigate();

    const [user, setUser] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);






    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    // const handleLogout = async () => {
    //     let confirm = window.confirm("Do you really want to logout ?");
    //     if (confirm) {
    //         await logout();
    //         toast.success("logged out successfully.", {
    //             position: "top-center",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //         navigate('/')
    //     } else {
    //         toast.success("You cancelled logout 🤗.", {
    //             position: "top-center",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //     }
    // }



    return (
        <header>
            <div className="container">

                <div id="head">
                    <div className="logo">
                        <img src="./images/bird-colorful-logo-gradient-vector_343694-1365.avif" alt="logo_image" />
                        <h2>iMona's</h2>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="Search" name="search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="pages">
                        <ul>
                            {/* <li><Link to="">adduser</Link></li> */}

                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about-us">About</Link></li>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/contact-us">Contact-us</Link></li>
                            <li><Link to="/support">Support</Link></li>
                            {/* <li><Link to="/add-cart"> <IoCartSharp  style={{ width: "40px", height: "30px", marginTop: "5px" }} />
                            <Badge className='relational_absolutnal'>{cartItemCounts}</Badge>     </Link></li> */}

                            <li><Button className='relational' onClick={(user) => navigate(`/add-cart`)}>
                            <IoCartSharp className='cart_icon' /><Badge className='relational_absolutnal'>{cartItemCounts}</Badge>Cart</Button></li>






                            {
                                !userToken ? (
                                    <li className="signIn"><Link to="/login">Sign in</Link></li>


                                ) : (
                                   
                                         <Dropdown> 
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                {firstName}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item disabled>{firstName}</Dropdown.Item>
                                                <Dropdown.Item><center><li className="logout"><Link onClick={handleLogout} >Logout</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/add-product">Add product</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/product-list">Product list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/add-category">Add category</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/category-list">Category list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/slider">Add slider</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/slider-list">Slider list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/add-subcategory">Add subcategory</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/subcategory-list">Sub category list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/add-gallery">Add Gallery</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/gallery-list"> Gallery list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/add-blog">Add Blog</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/blog-list">Blog list</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/my-add-product">My Add product</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/my-add-product-list">Myproduct list</Link></li></center></Dropdown.Item>
                                           









                                                <Dropdown.Item><center><li><Link to="/adduser">Add user</Link></li></center></Dropdown.Item>
                                                <Dropdown.Item><center><li><Link to="/userlist">User list</Link></li></center></Dropdown.Item>






                                            </Dropdown.Menu>
                                        </Dropdown> 
                                    
                                )
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header