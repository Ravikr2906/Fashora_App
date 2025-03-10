import React from 'react';
import { Link } from 'react-router-dom';


const ProductGrid = ({ products, loading, error }) => {

  if (loading)  return <p>Loading...</p>

  if(error)  return <p>Error: {error}</p> 
  
  return (
    <div className="container ">
      <div className="row g-4">
        {products.map((product, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link key={index} to={`/product/${product._id}`} className="text-decoration-none">
              <div className=" rounded">
                <div className="w-100 mb-2 ">
                  <img 
                    src={product.images[0]?.url} 
                    alt={product.images[0]?.alt || product.name} 
                    className="w-100 object-fit-cover rounded me-2" height={400} 
                  />
                </div>
                <h6 className='text-dark'>{product.name}</h6>
                <p className="text-muted">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
