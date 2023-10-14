import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let cartContext=createContext()

export default function CartContextProvider({children}){
const [numOfCartItems, setnumOfCartItems] = useState(0)
    const headers={
        token:localStorage.getItem("userToken")
    }
    // console.log("HeaderTokenInLogin",headers);

 

 async function addProductToCart(id){
    // console.log(id);
return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
{
    productId:id
},{

    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}

 async function getProductToCart(){
    // console.log("localstorage token",localStorage.getItem("userToken"));
    // console.log("HeaderToken",headers);
return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
{

    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}
let[cartId,setCartId]=useState(null)

// async function getCart(){
//  let {data}=await getProductToCart()
//  setCartId(data.data._id);
// }
// useEffect(
//     ()=>{
//         getCart()
//     },[]
// )

function onlinePay(cartId,url,values){
return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-website-livid.vercel.app`,
{
    shippingAddress:values
},
{
    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}
function deleteProductFromCart(id){
return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
{
    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}


function updateProduct(id,count){
return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count
},
{
    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}

async function addToWishList(id){
    // console.log(id);
return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
{
    productId:id
},{

    headers:{
        token:localStorage.getItem("userToken")
    }
}
).then(res=>res)
.catch(err=>err)
}

async function getWish(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
    
        headers:{
            token:localStorage.getItem("userToken")
        }    }
    ).then(res=>res)
    .catch(err=>err)
    }
    function deleteWish(id){
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            headers:{
                token:localStorage.getItem("userToken")
            }        }
        ).then(res=>res)
        .catch(err=>err)
        }
        async function clearCart(){

        

                let {data}=axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,

                    {

                        headers:{
                            token:localStorage.getItem("userToken")
                        } 
                    }
                
                )
            }
           




return <cartContext.Provider value={{setnumOfCartItems,numOfCartItems,onlinePay,clearCart,deleteWish,getWish, addToWishList,addProductToCart,getProductToCart,deleteProductFromCart,updateProduct}}>
{children}
</cartContext.Provider>
}