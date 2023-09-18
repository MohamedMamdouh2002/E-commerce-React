import React from 'react'
import notfound from "../../Assets/images/error.svg"
import style from "./Notfound.module.css"

export default function Notfound() {
  return <>
  <div className="d-flex justify-content-center">

<img className='p-5 ' src={notfound} alt="" />
  </div>
  </>
}
