import React, { useState } from 'react'
import { HiOutlineUser,HiBars3BottomRight } from 'react-icons/hi2'
import {HiOutlineShoppingBag} from "react-icons/hi2"
import {Link} from "react-router-dom"
import Searchbar from './Searchbar'
import CartDrawer from '../layout/CartDrawer'
import { useSelector } from 'react-redux'




const Navbar = () => {
// const [navDrawerOpen, setNavDrawerOpen] = useState(false)

// const { cart } = useSelector((state) => state.cart)

// const cartItemCount = cart?.product?.reduce((total, product) => total + product.quantity, 0) || 0;

const togglerNavDrawerOpen = () => {
  setNavDrawerOpen(!navDrawerOpen)
}
  

  return (
    <>
    <nav className="container  d-flex align-item-center justify-content-between  ">
      {/* Logo */}
      <div className='pt-3'>
        <Link to="/" className='navbar-brand fs-2 fw-bold me-4 '>Fashora</Link>
      </div>
      {/* NAV LINKS */}
      <div className='d-none d-md-flex gap-4 pt-4  me-4'>
        <Link to="/collections/all?gender=Men" className='nav-link fs-5 mt-2' style={{ color: '#4b5563' }}>MEN</Link>

        <Link to="/collections/all?gender=Women" className='nav-link fs-5 mt-2' style={{ color: '#4b5563' }}>WOMEN</Link>

        <Link to="/collections/all?category=Top Wear" className='nav-link fs-5 mt-2' style={{ color: '#4b5563' }}>TOP WEAR</Link>
        <Link to="/collections/all?category=Bottom Wear" className='nav-link fs-5 mt-2' style={{ color: '#4b5563' }}>BOTTOM WEAR</Link>
      </div>

{/* Profile-ICON */}
<div className='d-flex align-items-center gap-1 '>
<Link to="/profile" className='text-color-dark mt-3'>
<HiOutlineUser size={30} style={{ color: '#4b5563' }}/>
</Link>


  {/* Cart-Icon */}


 <CartDrawer/> 
 

{/* Search Icon */}

<Searchbar/>


{/* hamburger */}
<button onClick={togglerNavDrawerOpen}className="btn d-lg-none d-md-none   mt-2 btn-transparnt" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
    <HiBars3BottomRight size={30} style={{ color: '#4b5563' }} />
    </button>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h2 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">MENU</h2>

    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <nav>
    <Link to="/collections/all?gender=Men" className='my-2 bg-light text-secondary nav-link fs-5  border-bottom text-center '>MEN</Link>

    <Link to="/collections/all?gender=Women" className='my-2 bg-light text-secondary nav-link fs-5  border-bottom text-center '>WOMEN</Link>
    <Link to="/collections/all?category=Top Wear" className='my-2 bg-light text-secondary nav-link fs-5  border-bottom text-center '>TOP WEAR</Link>
    <Link to="/collections/all?category=Bottom Wear" className=' my-2 link- bg-light text-secondary nav-link fs-5  border-bottom text-center '>BOTTOM WEAR</Link>
    </nav>
  </div>
</div>
    
</div>
    </nav>

    
   
    </>
  )
}

export default Navbar