import React, { useContext } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import toast, { Toaster } from 'react-hot-toast';
import { cartContext } from '../../Contexts/CartContext';




export default function ProductDetails() {
  let {addProductToCart,setnumOfCartItems}=useContext(cartContext)
  async function addToCart(id){
    let {data}= await addProductToCart(id)
    // console.log(data);
    if(data.status=="success"){
      toast(` ✅ your Product Added to Cart `)
      setnumOfCartItems(data.numOfCartItems)
    }
  
    }
let {id}=useParams()
// console.log(id);
 function getProductDetails(x){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
  
}
let {isLoading,data ,isError}=useQuery("ProductDetails",()=>getProductDetails(id))
let ProDetails=data?.data.data
// console.log(data?.data.data);
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
return <>
<Toaster/>
  <h3>ProductDetails</h3>
  {ProDetails ?
  <div className='row align-items-center'>
<div className="col-md-4">
  <div className="">
  <Slider {...settings}>

    <img src={ProDetails.imageCover} className='w-100 ' alt="" />
  </Slider>
  </div>
</div>
<div className="col-md-8">
  <div className="">
    <h2 className='h5'>{ProDetails.title}</h2>
    <p className='h5'>{ProDetails.description}</p>
    <p className='h5 text-main'>{ProDetails.category?.name}</p>
    <p className='h5'>{ProDetails.price}</p>
    <div className=" d-flex justify-content-between">

    <p className='h5'> ratingsQuantity :{ProDetails.ratingsQuantity}</p>
    <span> <i className='fas fa-star rating-color'></i> {ProDetails.ratingsAverage}</span>
    </div>
    <button  onClick={()=> addToCart(data?.data.data.id)} className='btn bg-main  text-white w-100 my-2'  >Add to cart</button>
  </div>
</div>
  </div> :""}
  </>
}
