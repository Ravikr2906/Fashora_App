import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

const NewArrivals = () => {

  const [newArrivals, setNewArrivals] = useState([])

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`

        );
        setNewArrivals(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchNewArrivals()
  }, [])

  return (
    <section> 
      <div className="container mx-auto text-center mb-5 position-relative">
        <h2 className='mb-4 display-4'><strong>Explore New Arrivals</strong></h2>
        <p className='text-dark m'>Discover the latest styles straight off the runway. freshly added to keep your wardrobe on the cutting edge of fashion.</p>

      </div> 

           {/* Content */}
           
            <div className="container overflow-auto mx-auto d-flex  position-relative" style={{ whiteSpace: "nowrap" }}>
            {newArrivals.map((product) => (
              <div key={product._id} className='me-2 position-relative'
              style={{ minWidth: "250px" }}>
                <img 
                   src={product.images[0]?.url} 
                   alt={product.images[0]?.altText || product.name}
                   className='rounded w-100'  
                   />
                <div className=' position-absolute start-0 bottom-0 bg-dark bg-opacity-50 pt-1 px-3 rounded w-100'
                style={{
                  backdropFilter: "blur(10px)"
                }}
                >
                  
                  <Link to={`/product/${product._id}`} className="link-light text-decoration-none">
                  <h4>{product.name}</h4>
                  <p className='fw-bold'>$ {product.price}</p>
                  </Link>
                </div>
              </div>
              
            ))}
           
           </div> 
    </section>
  )
}

export default NewArrivals