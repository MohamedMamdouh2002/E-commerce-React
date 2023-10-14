import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import { UserContext } from '../../Contexts/UserContext'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Helmet} from "react-helmet";



export default function ForgetPassword() {
  let{setUserToken}=useContext(UserContext)
    let navigate =useNavigate()
  const [error,setError]=useState(null)
  const [isLoading,setisLoading]=useState(false)

 async function sendData(values){
  setisLoading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
  
  .catch((err)=>{setisLoading(false)
    setError(err.response.data.message)
  })
  setisLoading(false)
  // console.log(data);
 if(data.statusMsg==="success"){
  setisLoading(false)
  setUserToken(data.token)
  navigate('/VerifyCode')
 }
  }

let validationSchema=Yup.object({
  email:Yup.string().email("email format  is not valid").required("Email is required"),
})


  let formik =useFormik({
    initialValues:{
      email:"",
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
                 <meta charSet="utf-8" />
                 <title>Forget Password</title>
                 <link rel="canonical" href="http://mysite.com/example" />
             </Helmet>
  <div className="container w-75 my-5">
    {error?<div className='alert alert-danger'>{error}</div>:''}
    <h3>reset your account password

</h3>

<form onSubmit={formik.handleSubmit}>

<label htmlFor="email"></label>
{/* <input type="email"
name='email'

 className=' form-control'
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  values={formik.values.email}
  id='email'

/> */}
 <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
          <Form.Control name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="name@example.com" />
        </FloatingLabel>
{formik.errors.email &&formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:""}





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
<button disabled={!(formik.isValid&&formik.dirty)} className='btn btn-success  my-5' type=' submit'>Verify </button>
}

</form>
  </div>
  </>
}
