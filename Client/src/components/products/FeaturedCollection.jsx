import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp"


const FeaturedCollection = () => {
  return (
    <section className='my-5'>
       <div className='container d-flex mx-auto flex-column-reverse flex-lg-row align-items-center  rounded' style={{ backgroundColor: '#e6ffe6'}} >
         
         {/* left content */}
         <div className=" p-4 text-center text-lg-start">
         <h2 className='fs-4 mb-2'>Comfort and style</h2>
         <h2 className='display-5 mb-5'> Apparel made for your everyday life.</h2>
         <p className='mb-5 text-muted '>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great everyday.</p>
         <Link to="/collections/all" className='bg-dark text-white px-5 py-2 rounded fs-5 text-decoration-none'>Shop Now</Link>
         </div>

         {/* Right Content */}
         <div className="">
          <img src={featured} alt="featured-image" className=' img-fluid'  style={{borderRadius: '20px'}}/>
         </div>
       </div>
    </section>
  )
}

export default FeaturedCollection