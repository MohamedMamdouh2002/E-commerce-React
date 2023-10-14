import React, { useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import {Helmet} from "react-helmet";




export default function Register() {
  let navigate =useNavigate()
  const [error,setError]=useState(null)
  const [isLoading,setisLoading]=useState(false)

 async function sendData(values){
  setisLoading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  .catch((err)=>{setisLoading(false)
    setError(err.response.data.message)
  })
 if(data.message==="success"){
  setisLoading(false)
  navigate('/login')
 }
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let validationSchema=Yup.object({
  name:Yup.string().min(3,"name must be more than 3").max(15,"name must be less than 15").required("name is required"),
  email:Yup.string().email("email format  is not valid").required("Email is required"),
  phone:Yup.string().matches(phoneRegExp,"Phone is not Valid").required("Phone is required"),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,25}/,"password is not Valid").required("password is required"),
  rePassword:Yup.string().oneOf([Yup.ref("password")],"Re-password is not equal to the password ").required("password is not Valid"),
})


  let formik =useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      password:"",
      rePassword:""
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="container w-75 my-5">
    {error?<div className='alert alert-danger'>{error}</div>:''}
    <h3>Register Now :</h3>

<form onSubmit={formik.handleSubmit}>
<label htmlFor="username">Name :</label>
<input type="text"
 className=' form-control'
name='name'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.name}
  id='username'
/>
{formik.errors.name? <div className='alert alert-danger'>{formik.errors.name}</div>:""}
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

<label htmlFor="Phone">Phone :</label>
<input type="tel" className=' form-control'
name='phone'

  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.phone}
  id='Phone'

/>
{formik.errors.phone &&formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div>:""}

<label htmlFor="Password">Password :</label>
<input type="password" 
name='password'

className=' form-control'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.password}
  id='Password'

/>
{formik.errors.password &&formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div>:""}

<label htmlFor="repass">Re-password :</label>
<input type="password" 
name='rePassword'

className=' form-control'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.rePassword}
  id='repass'

/>
{formik.errors.rePassword &&formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:""}

{isLoading?<button  className='btn btn-success  opacity-75 my-5' type=' submit'>
<BallTriangle
  height={30}
  width={30}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
</button>:
<button disabled={!(formik.isValid&&formik.dirty)} className='btn btn-success  my-5' type=' submit'>Register</button>
}

</form>
  </div>
  </>
}
