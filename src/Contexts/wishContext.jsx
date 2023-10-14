import axios from "axios";
import { createContext } from "react";

export let wishContext =createContext()

export default function WishListContextProvider({children}){
    const headers={
        token:localStorage.getItem("userToken")
    }
    async function addToWishList(id){
        console.log(id);
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
        productId:id
    },{
    
        headers
    }
    ).then(res=>res)
    .catch(err=>err)
    }
   
return <wishContext.Provider value={addToWishList}>
    {children}
</wishContext.Provider>
}