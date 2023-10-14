import React from 'react'
import style from "./Address.module.css"
import { useFormik } from 'formik'
import { useContext } from 'react';
import { cartContext } from '../../Contexts/CartContext';
import { useParams } from 'react-router-dom';

export default function Address() {
  let {onlinePay}=useContext(cartContext)
let {id}=useParams()
console.log(id);
  async function handleAddress(values) {
 let res= await onlinePay(id,values)
 console.log(res);
 if(res?.data.status=='success'){

   window.location.href=res.data.session.url
 }
  }
 let formik=useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:''
  },
  onSubmit:handleAddress
 })
  return<>
  <form onSubmit={formik.handleSubmit}>
 <label htmlFor="details">Details</label>
 <input type="text"
 id='details'
 value={formik.values.details}
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 className='form-control'
 name='details'
 
 />
 <label htmlFor="phone">phone</label>
 <input type="text"
 id='phone'
 value={formik.values.phone}
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 className='form-control  my-2'
 name='phone'
 />
 <label htmlFor="city">city</label>
 <input type="text"
 id='city'
 value={formik.values.city}
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 className='form-control'
 name='city'
 />

<button type='submit' className=' my-3 btn text-white bg-main'>Pay now</button>
  </form>
  
  </>
}
