import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
import Home from './Components/main/Home'
import About from './Components/main/About';
import Product from './Components/main/Product';
import Support from './Components/main/Support';
import Signin from './Components/main/Signin';
import Signup from './Components/main/Signup';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Contact from './Components/main/Contact';
import ContactList from './Components/main/ContactList'
import ProductForm from './Components/main/ProductForm';
import ProductList from './Components/main/ProductList';
import ProductDetail from './Components/main/ProductDetail';
import CategoryAdd from './Components/main/CategoryAdd';
import CategoryList from './Components/CategoryList';
import Error from './Components/Error';
import Adduser from './Components/practice/Adduser';
import Userlist from './Components/practice/Userlist';
import EditCategory from './Components/main/EditCategory';
import AddCart from './Components/main/AddCart';
import SliderList from './Components/main/SliderList';
import AddSlider from './Components/main/AddSlider';
import AddSubCategory from './Components/AddSubCategory';
import SubCategoryList from './Components/SubCategoryList';
import GalleryAdd from './Components/GalleryAdd';
import GalleryList from './Components/main/GalleryList';
import AddBlog from './Components/main/AddBlog';
import BlogList from './Components/main/BlogList';
import MyAddProduct from './Components/main/MyAddProduct';
import MyAddProductList from './Components/main/MyAddProductList';
import MyEditProduct from './Components/main/MyEditProduct';






const App = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token ? true : false;



  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          {
            !isLoggedIn && (
              <Route path='/login' element={<Signin />} />

            )
          }
          <Route path='/adduser' element={<Adduser />} />
          <Route path='/userlist' element={<Userlist />} />


          <Route path='/about-us' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/support' element={<Support />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/contact-list' element={<ContactList />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/product-list' element={<ProductList />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/add-category' element={<CategoryAdd />} />
          <Route path='/category-list' element={<CategoryList />} />
          <Route path='/edit-category/:catId' element={<EditCategory />} />
          <Route path='/add-cart' element={<AddCart/>} />
          <Route path='/slider' element={<AddSlider/>} />
          <Route path='/slider-list' element={<SliderList/>} />
          <Route path='/add-subcategory' element={<AddSubCategory/>} />
          <Route path='/subcategory-list' element={<SubCategoryList/>} />
          <Route path='/add-gallery' element={<GalleryAdd/>} />
          <Route path='/gallery-list' element={<GalleryList/>} />
          <Route path='/add-blog' element={<AddBlog/>} />
          <Route path='/blog-list' element={<BlogList/>} />
          <Route path='/my-add-product' element={<MyAddProduct/>} />
          <Route path='/my-add-product-list' element={<MyAddProductList/>} />
          <Route path='/myedit-Product/:myId' element={<MyEditProduct/>} />




          <Route path='*' element={<Error />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
