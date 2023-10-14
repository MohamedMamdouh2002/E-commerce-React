import React from 'react'
import Style from './SubBrands.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Vortex } from 'react-loader-spinner'
export default function SubBrands() {
  let { id } = useParams()



  function getSubBrands(id) {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)


  }




  let { data, isLoading } = useQuery('brands', () => getSubBrands(id))
  // console.log(data?.data.data)




  if (isLoading) {
    return <div className='d-flex justify-content-center align-items-center w-100 vh-100'>

      <>
        <Vortex
          visible={true}
          height="100"
          width="100"

          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </>
    </div>


  }



  return <>




    <h1>{data?.data.data.name}</h1>


  </>

}
