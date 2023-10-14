import React from 'react'
import style from "./Cart.module.css"
import { useContext } from 'react'
import { cartContext } from '../../Contexts/CartContext'
import { useEffect } from 'react'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom'


export default function Cart() {
  let {clearCart,getProductToCart ,deleteProductFromCart,updateProduct}=useContext(cartContext)
  let [isLoading,setIsLoading] = useState(false);

  let[cartData,setCartData]=useState(null)

  async function getCartData(){
    setIsLoading(true);
    let {data}=await getProductToCart()
    setCartData(data)
    setIsLoading(false);
    // if(data.status ==='success'){

    // }
    // console.log("cartdata",data);
  }
  async function RemoveData(id){
    // setIsLoading(true);
    let {data}=await deleteProductFromCart(id)
    setCartData(data)
      
    // setIsLoading(false);
    // console.log(data);
  } 
  async function updateData(id,count){
    // setIsLoading(true);
    let {data}=await updateProduct(id,count)
    setCartData(data)
    // setIsLoading(false);
    // console.log(data);
  } 
  
  async function clearAllProducts() {
    let {data}=await clearCart()


    setCartData(data)




  }

  useEffect(()=>{getCartData()},[])
  // return <>
  //  <Helmet>
  //               <meta charSet="utf-8" />
  //               <title>My Cart</title>
  //               <link rel="canonical" href="http://mysite.com/example" />
  //           </Helmet>
  //     {isLoading? <div className={`d-flex justify-content-center align-items-center BgDark ${style.marg}`}>
  //           <RotatingLines
  //         strokeColor="grey"
  //         strokeWidth="5"
  //         animationDuration="0.75"
  //         width="96"
  //         visible={true}
  //       />
  // </div> :<>
  // {cartData?  
  // <div className=" bg-body-tertiary p-5 my-5">
  
  // {cartData?<>
  //   <h3>shop cart</h3>
  //   <h5 className='text-main'>total number of items:{cartData?.numOfCartItems}</h5>
  //   <h5 className='text-main'>Total Cart Price :{cartData?.data.totalCartPrice}</h5>
  //   {cartData.data.products.map((item)=>(
  //     <div key={item._id} className="row align-items-center ">
  //       <div className="col-md-2">
  //         <img src={item.product.imageCover} className=' w-100 mb-5' alt="" />
  //       </div>
        
  //       <div className="col-md-10 d-flex justify-content-between">
  //         <div className="">
  //           <h3>{item.product.title}</h3>
  //           <h3 className=' text-main'>Price:{item.price}</h3>
  //           <button onClick={()=>{RemoveData(item.product._id)}} className='btn  '> <i className='fa fa-trash text-main'></i>Remove</button>
  //         </div>
  //         <div className="">
  //           <button onClick={()=>updateData(item.product._id,item.count+1)} className='btn btn-brdr'> <i className='fas fa-plus'></i></button>
  //           <span className='mx-2'>{item.count}</span>
  //           <button onClick={()=>updateData(item.product._id,item.count-1)} className='btn btn-brdr'> <i className='fas fa-minus'></i></button>
  //         </div>
  //       </div>
  //       <hr />

  //      <div className="d-flex gap-3">

  //       <Link to={`/address/${cartData.data._id}`} className='btn bg-main text-white'>Online payment</Link>
  //       <button className='btn bg-main text-white'>Cash payment </button>
  //      </div>
  //     </div>
  //       ))
  //       }</>:<>
  //       "sss"
  //       </>
  //       }
  //       {/* <button onClick={()=>clearAllProducts} className='btn btn-brdr'> <i className='fas fa-minus'></i></button> */}
  // </div>
  // : "cart is empty"}
  // </>
  // }
  // </>


  return <>
  {cartData?
  <>
  {cartData?.numOfCartItems != 0?
  <>
  {isLoading?<><div className='position-relative'>
      <div className={`d-flex justify-content-center align-items-center BgDark ${style.marg}`}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      </div>
    </div>
    <div className='container py-5 my-5 p-5 bg-light rounded'>
      <div className='d-flex justify-content-between mb-4'>
        <h2>Cart Shop</h2>
        <button className='btn bg-main text-white'>
           <Link to={`/address/${cartData.data._id}`} className='text-white'>Online payment</Link>
        </button>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h5>total price: <span className='text-main'>{cartData?.data.totalCartPrice}</span></h5>
        <h5>total number of items: <span className='text-main'>{cartData?.numOfCartItems}</span></h5>
      </div>

      {cartData?.data.products.map((item)=>(
        <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2'>
          <div className='col-md-2'>
            <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
          </div>
          <div className='col-md-10 d-flex justify-content-between'>
            <div>
              <h5>{item.product.title}</h5>
              <h6>{item.price} EGP</h6>
              <button onClick={()=>RemoveData(item.product._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
            </div>
            <div>
              <button onClick={()=>updateData(item.product._id, item.count+1)} className='btn btn-brdr'><i className='fas fa-plus'></i></button>
              <span className='mx-3 fw-bold'>{item.count}</span>
              <button onClick={()=>updateData(item.product._id, item.count-1)} className='btn btn-brdr'><i className='fas fa-minus'></i></button>
            </div>
          </div>
        </div>
      ))}

      {/* <button onClick={()=>clearCartData()} className='btn-brdr btn btn-lg d-block mx-auto'> Clear Your Cart</button> */}
      
    </div></>:<div className='container py-5 my-5 p-5 bg-light rounded'>
      <div className='d-flex justify-content-between mb-4'>
        <h2>Cart Shop</h2>
        <button className='btn btn bg-main text-white btn-lg'>
          <Link to={`/address/${cartData.data._id}`} className='text-white'>Online payment</Link>
        </button>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h5>total price: <span className='text-main'>{cartData?.data.totalCartPrice}</span></h5>
        <h5>total number of items: <span className='text-main'>{cartData?.numOfCartItems}</span></h5>
      </div>
        
      {cartData?.data.products.map((item)=>(
        <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2'>
          <div className='col-md-2'>
            <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
          </div>
          <div className='col-md-10 d-flex justify-content-between'>
            <div>
              <h5>{item.product.title}</h5>
              <h6>{item.price} EGP</h6>
              <button onClick={()=>RemoveData(item.product._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
            </div>
            <div>
              <button onClick={()=>updateData(item.product._id, item.count+1)} className='btn btn-brdr'><i className='fas fa-plus'></i></button>
              <span className='mx-3 fw-bold'>{item.count}</span>
              <button onClick={()=>updateData(item.product._id, item.count-1)} className='btn btn-brdr'><i className='fas fa-minus'></i></button>
            </div>
          </div>
        </div>
      ))}

 <Link to={`/address/${cartData.data._id}`} className='btn bg-main text-white'>Online payment</Link>

    </div>}
  
  </>
  :<>
  <div className='container py-5 my-5 p-5 bg-light rounded'>
    <div className='d-flex justify-content-between mb-4'>
      <h2>Cart Shop</h2>
    </div>
    <p className='mx-auto h2'>your cart is empty</p>
      
  </div>
  
  </>

  
  }
  
  
  </>:<div className='container py-5 my-5 p-5 bg-light rounded'>
    <div className='d-flex justify-content-between mb-4'>
      <h2>Cart Shop</h2>
    </div>
    <p className='mx-auto h2'>your cart is empty</p>
      
  </div>}
  

</>
}
