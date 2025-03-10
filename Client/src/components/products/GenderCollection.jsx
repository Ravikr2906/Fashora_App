import React from 'react'
import men from "../../assets/men.jpg"
import women from "../../assets/women.jpg"
import { Link } from 'react-router-dom'

const GenderCollection = () => {
  return (
    
    <section className='py-5 px-2'>
  <div className='container'>
    <div className='row'>
      {/* Women  Collection*/}
      <div className='mb-2 col-lg-6 position-relative'>
      <img src={women} alt="Women's Collection" className='img-fluid rounded'/>

      <div className='justify-content-around ms-3 mb-2 position-absolute  text-dark bg-white bottom-0 start-0 py-1 px-2 rounded bg-opacity-75'>
        <h3><strong>Women's Collection</strong></h3>
        <Link to="/collections/all?gender=Women" className="link-dark">Shop Now</Link>
      </div>
      </div>
      

      {/* Mens Collection */}
      
      <div className='mb-2 col-lg-6 position-relative'>
      <img src={men} alt="Men's Collection" className='img-fluid rounded'/>

      <div className='justify-content-around ms-3 mb-2 position-absolute  text-dark bg-white bottom-0 start-0 py-1 px-2 rounded bg-opacity-75'>
        <h3><strong>Men's Collection</strong></h3>
        <Link to="/collections/all?gender=Men" className="link-dark">Shop Now</Link>
      </div>
      </div>
    </div>
  </div>
      </section>
  )
}

export default GenderCollection