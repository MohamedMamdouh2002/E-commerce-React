import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../Assets/images/freshcart-logo.svg"
import { UserContext } from '../../Contexts/UserContext'
import { cartContext } from '../../Contexts/CartContext'


export default function Navbar() {
  let nav=useNavigate()
  let {userToken,setUserToken}=useContext(UserContext)
  let {numOfCartItems,setnumOfCartItems,getProductToCart}=useContext(cartContext)
  async function getCartItem(){
    let {data}=await getProductToCart()
    console.log(data);
    if(data?.status==='success'){
        setnumOfCartItems(data?.numOfCartItems)
    }
    console.log("cartitem",data);
 
}

if (localStorage.getItem("userToken")) {
    getCartItem()

}
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
        {userToken?   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="">Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="wishList">WishList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brand">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="allorders">All Orders</Link>
        </li>
      
       
      </ul>: ""}
    
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
        <li className="nav-item d-flex align-items-center gap-3" >
            <i className='fa-brands fa-facebook-f'></i>
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-brands fa-tiktok'></i>
            <i className='fa-brands fa-youtube '></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-linkedin'></i>
        </li>


{userToken?<>
  <li className='nav-item position-relative'>
          <Link className='nav-link fw-bolder' to='cart'>
            <i className='fa-solid fa-cart-shopping fs-3'></i>
            <div className='badge position-absolute text-white top-0 end-0 bg-main'>{numOfCartItems}</div>
          </Link>
        </li>
    <li className="nav-item">
          <a className="nav-link cursor-pointer" onClick={
            ()=>{
              
              localStorage.removeItem("userToken")
              setUserToken(null)
              nav('/Login')
            }
          }>Log out</a>
        </li>
            </>
         :
        <>

        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        
        </>}
      
      
       
      </ul>
  
    </div>
  </div>
</nav>
 
  </>
}
