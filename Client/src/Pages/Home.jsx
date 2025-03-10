import React, { useEffect } from 'react'
import Hero from '../components/layout/Hero'
import GenderCollection from '../components/products/GenderCollection'
import NewArrivals from '../components/products/NewArrivals.jsx'
import ProductDetails from "../components/products/ProductDetails.jsx"
import ProductGrid from '../components/products/ProductGrid.jsx'
import FeaturedCollection from '../components/products/FeaturedCollection.jsx'
import {useDispatch, useSelector} from "react-redux"
import { useState } from 'react'
import { fetchProductsByFilters } from '../redux/slice/productsSlice.js'
import axios from 'axios'




const Home = () => {

  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null)

  useEffect(() => {
    //fetch products for a specific collection

    dispatch(
      fetchProductsByFilters({
     gender: "Women",
     category: "Bottom Wear",
     limit: 8,
      })
    );

    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`

        );
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    };

    fetchBestSeller();
  }, [dispatch])

  return (
    <div>
    <Hero/>
    <GenderCollection/>
    <NewArrivals/>

    {/* Best Seller */}
    <h2 className='display-5 text-center  mt-5 mb-3'>Best Seller </h2>
    {bestSellerProduct ? (
      <ProductDetails productId={bestSellerProduct._id} />
       ) : (
       <p className='text-center'>Loading best seller product ...</p>
       )}

{/* Top wears for women */}
    <div className='mt-5 text-center container mx-auto'>
      <h2 className='display-5 text-center mb-4'>Top Wears for women</h2>
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
    
    {/* featured collections */}
    <FeaturedCollection/>
    </div>
  );
};

export default Home