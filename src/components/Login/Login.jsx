import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import { UserContext } from '../../Contexts/UserContext'

import {Helmet} from "react-helmet";



export default function Login() {
  let{setUserToken}=useContext(UserContext)
    let navigate =useNavigate()
  const [error,setError]=useState(null)
  const [isLoading,setisLoading]=useState(false)

 async function sendData(values){
  setisLoading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
  .catch((err)=>{setisLoading(false)
    setError(err.response.data.message)
  })
 if(data.message==="success"){
  setisLoading(false)
  localStorage.setItem("userToken",data.token)
  setUserToken(data.token)
  navigate('/')
 }
  }
  function ForgetPassword() {
    navigate('/forgetPassword')
    
  }

let validationSchema=Yup.object({
  email:Yup.string().email("email format  is not valid").required("Email is required"),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password is not Valid").required("password is required"),
})


  let formik =useFormik({
    initialValues:{

      email:"",
      password:"",
      
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
                 <meta charSet="utf-8" />
                 <title>Log in</title>
                 <link rel="canonical" href="http://mysite.com/example" />
             </Helmet>
  <div className="container w-75 my-5">
    {error?<div className='alert alert-danger'>{error}</div>:''}
    <h3>Login Now :</h3>

<form onSubmit={formik.handleSubmit}>

<label htmlFor="email">Email :</label>
<input type="email"
name='email'

 className=' form-control'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.email}
  id='email'

/>
{formik.errors.email &&formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:""}



<label htmlFor="Password">Password :</label>
<input type="password" 
name='password'

className=' form-control'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.password}
  id='Password'

/>
<h6 className='text-main my-1 cursor-pointer' onClick={()=>ForgetPassword()}>forget Password?  </h6>
{formik.errors.password &&formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div>:""}


{isLoading?<button  className='btn btn-success  my-5' type=' submit'>
<CirclesWithBar
  height="30"
  width="30"
  color="#fff"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
</button>:
<button disabled={!(formik.isValid&&formik.dirty)} className='btn btn-success  my-5' type=' submit'>Login </button>
}

</form>
  </div>
  </>
}
