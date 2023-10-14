import React from 'react'
import style from "./CategorySlider.module.css"
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";
export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    slidesToShow: 7  ,
    arrows:false,

    slidesToScroll: 1
  };
  function getCategorySlider(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { isLoading, isFetching,data}=useQuery("categorySlider",getCategorySlider)
  // console.log(data?.data.data);
  return <>
    
   
   
  {data?.data.data?
  <div className='py-5'>

   <Slider {...settings}> {data?.data.data.map((cat)=>
  <img height={200} key={cat._id} src={cat.image} alt="" />
  )}</Slider>
  </div>
  :""}
  </>
}
