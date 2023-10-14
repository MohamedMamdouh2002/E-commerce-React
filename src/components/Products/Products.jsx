import React from 'react'
import style from "./Products.module.css"
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import {Helmet} from "react-helmet";


export default function Products() {
  return <>
<FeaturedProducts/>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  </>
}
