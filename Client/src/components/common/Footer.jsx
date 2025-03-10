import React from 'react'
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className='container  border-top py-5 '>
      <div className='  row '>
        <div className='col-md-4'>
        <div className='mb-3'>
          <h5 className='mb-4 ' style={{ color: '#4b5563' }}>Newsletter</h5>
          <p className='text-secondary mb-4'>
            Be the first to hear about new products, exclusive events and online offers.
          </p>
          <p className='text-secondary'>Sign up and get 5% off your first order.</p>
          
          {/* News letter form */}
          <form className='d-flex  '>
            <input type="email" placeholder='Enter your email ' className='ps-2 text-dark rounded'/>
            <button type="submit" className='btn btn-dark  btn-sm text-white  '>Subscribe</button>
          </form>
        </div>
        </div>
        {/* Shop links */}
        <div className='col-4 mb-3'>
        <h3 style={{ color: '#4b5563' }}>Shop</h3>
        <ul className='list-group '>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Men's top Wear</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Women's top Wear</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Men's bottom Wear</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Women's bottom Wear</Link>
         </li>
        </ul>
        </div>

        {/* Support */}
        <div className='col-4 mb-3'>
        <h3 style={{ color: '#4b5563' }}>Support</h3>
        <ul className='list-group '>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Contact Us</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >About Us</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >FAQs</Link>
         </li>
         <li className='list-group mt-2'>
          <Link to="#" className='text-secondary nav-link' >Features</Link>
         </li>
        </ul>
        </div>

        <div className='border-top  pt-3'>
          <p className='text-secondary text-center fs-5'>
          &copy; 2025, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer