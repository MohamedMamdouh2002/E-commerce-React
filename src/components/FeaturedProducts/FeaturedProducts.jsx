import React, { useEffect, useState } from 'react'
import style from "./FeaturedProducts.module.css"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Watch } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { cartContext } from '../../Contexts/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import  wishContext  from '../../Contexts/wishContext'
import { counterContext } from '../../Contexts/counterContext'




export default function FeaturedProducts() {
  let {setCounter} = useContext(counterContext);

  // const {addToWishList}=useContext(wishContext);
  let {setnumOfCartItems,addProductToCart,addToWishList,getWish}=useContext(cartContext);
  const [search, setSearch] = useState("");
  // console.log(search);
  
  async function addToCart(id){
    let {data}= await addProductToCart(id)
    // console.log(data);
    if(data.status=="success"){
      toast(` ✅ your Product Added to Cart `)
      setnumOfCartItems(data.numOfCartItems)
    }

    }
    
    async function addWishList(id){
      let {data}= await addToWishList(id)
      // console.log("errwishlist",data);
      if(data.status ==="success"){
        toast(` ✅ your Product Added to wishlist `)
        setCounter(data.numOfCartItems)
       

        for (let i = 0; i < data?.data.length; i++) {
          // console.log(data?.data[i]);
          document.getElementById(data?.data[i]).classList.add("text-danger")
          
        }
      }
     
      }
      async function getToWish(){
        let {data}=await getWish()
        // console.log("woishdatainhome",data);
        data?.data.map((item)=>{
        //  console.log(item._id);
        //  console.log("element",document.getElementById(item._id));
          document.getElementById(item._id)?.classList.add("text-danger")
        })
        
      }
      // let WishData = useQuery('getWishListProduct', ()=>getToWish());
      if (localStorage.getItem("userToken")) {
        getToWish()
      }
    //   if (WishData) {
    //     WishData?.data?.data.data.map((item)=>{
    //     //  console.log(item._id);
    //     //  console.log("element",document.getElementById(item._id));
    //      document.getElementById(item._id)?.classList.add("text-danger")
    //     })
    //  }
  // let [FeaturedProducts,setFeaturedProducts]=useState([])
  //  async function getFeaturedProducts(){
  //   let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //   console.log(data);
  //   setFeaturedProducts(data.data)
  // }
  // useEffect(()=>{getFeaturedProducts()},[])
  function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let { isLoading, isFetching,data,refetch}=useQuery("getProduct",getProducts,{
    // cacheTime:2000,
    // enabled:false,
  })
  // console.log("isLoading",isLoading);
  // console.log("isFetching",isFetching);
  
  return <>
  <input type="text"
   className=' form-control w-100 my-4 py-3' placeholder='Search'
   onChange={(e)=>setSearch(e.target.value)}
   />
  <div className="row">
    <Toaster/>
    {/* <button className='btn bg-main w-100 text-white' onClick={()=>refetch()}>Get All Product</button> */}
   {isLoading? <div className=" d-flex justify-content-center mt-5">
   <Watch
  height="80"
  width="80"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>

   </div>:data?.data.data.filter((product)=>{
   if(search==""){
    return product
   }
   else if
   (search && product.title.toLowerCase().includes(search.toLowerCase())){
    return product
   }
   }).map((product)=>
<div key={product.id} className='col-md-3 my-5 overflow-hidden'>
  <div className="product p-3 rounded-3">
  <Link to={`product/${product._id}`}>
  <img   src={product.imageCover} className='w-100 ' alt="" />
  <h2 className='h6 text-main fw-bold'> {product.category.name}</h2>
  <h2 className='h4'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
  
  <div className="d-flex justify-content-between">
  <p className=''>{product.price } EGp</p>

<div className="d-flex ">
  <p>{product.ratingsAverage}</p>
    <i className='fas fa-star text-warning mt-1'></i>
  </div>
  </div>
  </Link>
<div className="d-flex gap-1 justify-content-between">

  <i onClick={()=> addWishList(product._id)} id={product._id} className='  fas fa-heart fs-2'></i>
  <button  onClick={()=> addToCart(product._id)} className='btn bg-main btn-small w-100 text-white'>Add to cart</button>
</div>
  </div>
</div>
)} 
   


 </div>
  </>
}
