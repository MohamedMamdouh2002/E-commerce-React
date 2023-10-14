import React from 'react'
import style from "./Categories.module.css"
import {Helmet} from "react-helmet";
import { useQuery } from 'react-query';
import axios from 'axios';
import CategoryDetails from '../CategoryDetails/CategoryDetails';
import { Link } from 'react-router-dom';
import { Watch } from 'react-loader-spinner';

export default function Categories() {
  function getCategory(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories/")
  }
  let { isLoading, isFetching,data,refetch}=useQuery("getCategory",getCategory,{
    // cacheTime:2000,
    // enabled:false,
  })
  // console.log(data?.data.data);
  const CatData=data?.data.data;
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {CatData ?<>
            <div className="row p-3 g-4  ">
                    {CatData.map((item)=>
                    <div key={item._id} className="col-md-4">

                      <Link to={`/categoryDetails/${item._id}`}>
                <div className=" product rounded-2">
                  <div className="catImg">
                    <img height={300} src={item.image} className='w-100 rounded-2' alt="" />
                  </div>
                  <div className="bg-white">
                      <h3 className='p-3 text-center'>{item.name}</h3>
                  </div>
                </div>
                </Link>
              </div>
            )}
            </div>
                
           

            </> 
            
            :""}
      
         

  </>
}
