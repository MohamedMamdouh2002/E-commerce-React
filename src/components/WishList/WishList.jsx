import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { cartContext } from '../../Contexts/CartContext'
import { RotatingSquare } from 'react-loader-spinner'
import { counterContext } from '../../Contexts/counterContext'


export default function WishList() {
  let {setCounter} = useContext(counterContext);
  let[WishData,setWishData]=useState(null)
  let {deleteWish,getWish,addProductToCart,numOfCartItems,setnumOfCartItems}=useContext(cartContext)
  async function getToWish(){
    let {data}=await getWish()
    setWishData(data)
    // console.log("woishdatainhome",data);
  }
  async function RemoveWish(id){
    let {data}=await deleteWish(id)
    // setWishData(data)
    getToWish()
    // console.log("woishdeletinhome",data);
  } 
  async function addCart(id){
    let {data}=await addProductToCart(id)
    setnumOfCartItems(data.numOfCartItems)
  
    // console.log(data);
  } 
  useEffect(()=>{
    if (localStorage.getItem("userToken")) {
    getToWish()
    }
  },[])
    
    return <>
     {WishData?
  
  <div className=" bg-body-tertiary p-5 my-5">
    <h3>shop cart</h3>
    <h5 className='text-main'>total number of items:{WishData.count}</h5>
    {/* <h5 className='text-main'>Total Cart Price :{WishData?.data.totalCartPrice}</h5> */}
    {WishData?.data?.map((item)=>(
      <div key={item._id} className="row align-items-center ">
        <div className="col-md-2">
          <img src={item.imageCover} className=' w-100 mb-5' alt="" />
        </div>
        <div className="col-md-10 d-flex justify-content-between">
          <div className="w-100">
            <h3>{item.title}</h3>
            <h3 className=' text-main'>Price:{item.price}</h3>
            <button onClick={()=>{RemoveWish(item.id)}}  className='btn  '> <i className='fa fa-trash text-main'></i>Remove</button>
          </div>
          <div>
            <button onClick={()=>addCart(item._id)}  className="  btn btn-outline-success">Add To Cart</button>
          </div>
         
        </div>
      </div>
    ))}
  </div>
  :  <div className="loading d-flex justify-content-center">
  <RotatingSquare
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="rotating-square-loading"
  strokeWidth="4"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div> }
  </>
}
