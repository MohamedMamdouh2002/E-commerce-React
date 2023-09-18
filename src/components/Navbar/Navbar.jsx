import React from 'react'
import style from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import logo from "../../Assets/images/freshcart-logo.svg"


export default function Navbar() {
  return <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link to="">

<img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
      
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
        <li className="nav-item d-flex align-items-center gap-3" >
            <i className='fa-brands fa-facebook-f'></i>
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-brands fa-tiktok'></i>
            <i className='fa-brands fa-youtube '></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-linkedin'></i>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
      
       
      </ul>
  
    </div>
  </div>
</nav>
 
  </>
}
