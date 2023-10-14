import React from "react";
import Layout from "./components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CounterContextProvider from "./Contexts/counterContext";
import UserContextProvider from "./Contexts/UserContext";
import Gurad from "./components/Gurad/Gurad";
import CartContextProvider from "./Contexts/CartContext";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import SubBrands from "./components/SubBrands/SubBrands";
import WishList from "./components/WishList/WishList";
import Address from "./components/Address/Address";
import Orders from "./components/Orders/Orders";
import WishListContextProvider from "./Contexts/wishContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPass from "./components/ResetPass/ResetPass";

const routers=createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element:<Gurad><Home/></Gurad>},
    {path:"brand",element:<Gurad><Brands/></Gurad>},
    {path:"categories",element:<Gurad><Categories/></Gurad> },
    {path:"categoryDetails/:id",element:<Gurad><CategoryDetails/></Gurad> },
    {path:"cart",element:<Gurad><Cart/></Gurad> },
    {path:"products",element:<Gurad><Products/></Gurad>} ,
    {path:"address/:id",element:<Gurad><Address/></Gurad>} ,
    {path:"allorders",element:<Gurad><Orders/></Gurad>} ,
    {path:"forgetPassword",element:<ForgetPassword/>} ,
    {path:"product/:id",element:<Gurad><ProductDetails/></Gurad>} ,
    {path:"subBrands/:id",element:<Gurad><SubBrands/></Gurad>} ,
  
    {path:"resetPass",element:<ResetPass/>},
    {path:"VerifyCode",element:<VerifyCode/>},
    {path:"register",element:<Register/>},
    {path:"wishList",element:<WishList/>},
    {path:"login",element:<Login/>},
    {path:"*",element:<Notfound/>},
  ]}
])

function App() {
  return <>
  <UserContextProvider>

<CounterContextProvider>

<CartContextProvider>

<WishListContextProvider>
 <RouterProvider router={routers}>

 </RouterProvider>
</WishListContextProvider>
</CartContextProvider>
</CounterContextProvider>
  </UserContextProvider>

  
  </>
}

export default App;
