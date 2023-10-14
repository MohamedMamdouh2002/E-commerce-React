

import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CirclesWithBar, InfinitySpin } from 'react-loader-spinner'
import { UserContext } from '../../Contexts/UserContext'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Helmet} from "react-helmet";


export default function ResetPass() {
  let{setUserToken}=useContext(UserContext)
    let navigate =useNavigate()
  const [error,setError]=useState(null)
  const [isLoading,setisLoading]=useState(false)

 async function sendData(values){
  setisLoading(true)
 let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
  
  .catch((err)=>{setisLoading(false)
    setError(err.response.data.message)
  })
  // console.log( "reset",data);
  setisLoading(false)
  // console.log( "res",data);
  if (data?.token) {
    setisLoading(false);
    localStorage.setItem('userToken',data.token)
    setUserToken(data.token);
    navigate('/')
  }
  }

  let validationSchema=Yup.object({
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/,"Password format not valid ").required("Password is Required")
  })
  
    let formik =useFormik({
      initialValues:{
        email:'',
        newPassword:''
      },
      validationSchema,
      onSubmit:sendData
    })
  return <>
    <Helmet>
                 <meta charSet="utf-8" />
                 <title>Reset Password</title>
                 <link rel="canonical" href="http://mysite.com/example" />
             </Helmet>
             {error?<div className='alert alert-danger'>{error}</div>:''}

             <form onSubmit={formik.handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="email" className="mb-3" >
          <Form.Control name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" placeholder="Leave a code here" />
        </FloatingLabel>
        
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

        <FloatingLabel controlId="floatingnewPassword" label="password">
          <Form.Control name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" placeholder="New Password" />
        </FloatingLabel>
        {formik.errors.newPassword && formik.touched.newPassword?<div className='alert alert-danger mt-2'>{formik.errors.newPassword}</div>:null}
        
        {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-lg me-auto btn-outline-success my-3'>reset newPassword</button>}
          
      </form>
  </>
}

