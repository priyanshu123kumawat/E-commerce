import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = "http://localhost:2000/api";
// Create AuthContext
export const AuthContext = createContext();


// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [authData, setAuthData] = useState({});
  const [cartItemCounts, setCartItemCounts] = useState(0);

  const hasRole = (role) => {
    return isLoggedIn && authData.role === role;
  }

  // const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to handle login
  const setTokenInLs = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to handle logout
  const logout = () => {
    setToken("");
    setAuthData("");
    setCartItemCounts('')
    localStorage.removeItem("token");
  };

  // loginUser 
  const loginUser = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password
      });
      await cartCount();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchUserDetails = async () => {
    //call api
    try {
      const response = await axios.get(`${API_BASE_URL}/user/user-authorized`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      // console.log('res',response.data.user);
      if (response.data.success) {
        const userData = response.data.user;
        setAuthData({ ...userData });
      } else {
        const errorResponse = await response.data;
        // logout();
      }
    } catch (error) {
      // logout();
      console.log("Error on Contact Page:", error);
    }
  };

  const addToCart = async (payload) => {

    try {

      const response = await axios.post(`${API_BASE_URL}/cart/add-cart`, payload, {
        headers: {
          'authorization': token
        }
      })
      await cartCount();
      return response
    } catch (error) {
      console.log("Error in Add to cart Function", error);
      return error.response.data;
    }

  };

  const cartCount = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/cart/cart-count', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      const completeRes = await response.json();
      // console.log(completeRes.data);
      setCartItemCounts(completeRes.data)
      return response;

    } catch (error) {
      console.log("Error in Add to cart Function", error);
    }

  };

  // useEffect to update isLoggedIn based on token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
    fetchUserDetails();
    cartCount();
  }, [token, cartItemCounts]);

  // AuthContext Provider value
  const contextValue = {
    token,
    isLoggedIn,
    setTokenInLs,
    logout,
    fetchUserDetails,
    authData,
    hasRole, loginUser,
    addToCart,
    cartItemCounts,
    API_BASE_URL,
    cartCount
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};