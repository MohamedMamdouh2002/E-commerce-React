import React from "react";
import Layout from "./components/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const routers=createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"brand",element:<Brands/>},
    {path:"login",element:<Login/>},
    {path:"categories",element:<Categories/>},
    {path:"register",element:<Register/>},
    {path:"cart",element:<Cart/>},
    {path:"products",element:<Products/>},
    {path:"*",element:<Notfound/>},
  ]}
])

function App() {
  return <>
 <RouterProvider router={routers}>

 </RouterProvider>
  
  </>
}

export default App;
