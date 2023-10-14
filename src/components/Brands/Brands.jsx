import React, { useState } from 'react'
import style from "./Brands.module.css"
import {Helmet} from "react-helmet";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Vortex, Watch } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {
  let [brandDetail, setBrandDetail] = useState(null)

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

}  let{isLoading, isFetching,data} =useQuery("Brands",getBrands)
// console.log(data?.data.data);
const brand=data?.data.data;



async function getSubBrands(id) {

  try {
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);


    const brands = response.data.data;
    setBrandDetail(brands);
    // console.log(brands)
    // brandDetail.push(brands)
  } catch (error) {
    console.error(error);
  }
}

 
  return <>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container">




              <div className="row gy-3">
                {brandDetail !== null ? <div key={brand._id} className='d-flex align-item-center justify-content-between'>
                  <div className='mt-5'>
                    <h1 className='text-main rounded-3 text-center' >{brandDetail.name}</h1>
                    <p className=' rounded-3 text-center ' >{brandDetail.name}</p>

                  </div>
                    <div>
                    <img src={brandDetail.image} alt={brandDetail.name} className='w-100' />

                  </div>



                </div>

                  :


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
                }

              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> 
  <h1 className='text-center text-main'>All Brands</h1>

          <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {isLoading?<div className=" d-flex justify-content-center mt-5">
   <Watch
  height="80"
  width="80"
  radius="48"
  color="#4fa94d"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>

   </div>:<>
   <div className="row  g-3">{
brand.map((brand)=><>
 <div key={brand._id}  onClick={() => getSubBrands(brand._id)} className="col-md-3    ">

<Link data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <div className=" border product rounded-3">
        <div className="">

    <img src={brand.image} className='w-100 rounded-3' alt="" />
        </div>
      <h6 className='text-center text-main'> {brand.name}</h6>
  

         
      </div>
</Link>
    </div></>
      )}
   </div>
   
   </>

            }
  </>
}

