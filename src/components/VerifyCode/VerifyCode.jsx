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



export default function VerifyCode() {
  let{setUserToken}=useContext(UserContext)
    let navigate =useNavigate()
  const [error,setError]=useState(null)
  const [isLoading,setisLoading]=useState(false)

 async function sendData(values){
  setisLoading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
  
  .catch((err)=>{setisLoading(false)
    setError(err.response.data.message)
  })
  // console.log( "verify1",data);
  setisLoading(false)
  // console.log( "verify1",data);
  if (data.status=="Success") {
    setisLoading(false);
    navigate('/resetPass')
  }
  }

let validationSchema=Yup.object({
  resetCode:Yup.string().required("Code is Required")
})


let formik = useFormik({
  initialValues:{
    resetCode:''
  },
  validationSchema,
  onSubmit:sendData
})
  return <>
    <Helmet>
                 <meta charSet="utf-8" />
                 <title>Code</title>
                 <link rel="canonical" href="http://mysite.com/example" />
             </Helmet>
  <div className="container w-75 my-5">
    
    {error?<div className='alert alert-danger'>{error}</div>:''}
    <h3>reset your account password
</h3>

<form onSubmit={formik.handleSubmit}>


  <FloatingLabel controlId="floatingInput" label="code" className="mb-3" >
          <Form.Control name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" placeholder="Leave a code here" />
        </FloatingLabel>
        {formik.errors.resetCode && formik.touched.resetCode?<div className='alert alert-danger mt-2'>{formik.errors.resetCode}</div>:null}





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
<button  className='btn btn-success  my-5' type=' submit'>Verify 1</button>
}

</form>
  </div>
  </>
}
