import React, { useContext, useEffect } from 'react'
import style from "./Layout.module.css"
  import Navbar from '../Navbar/Navbar'
  import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Contexts/UserContext'
import { Offline, Online } from "react-detect-offline";


export default function Layout() {
  let {setUserToken}=useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken")!=null){
      setUserToken(localStorage.getItem("userToken"))
    }

  })
  return <>
<Navbar/>
<div className="container ">

<Outlet/>
<div >
    <Offline> <div className='network'>
      <i className='fas fa-wifi me-2' ></i>Only shown offline (surprise!)
      </div> 
      </Offline>
  </div>
</div>
<Footer/>
  </>
}
