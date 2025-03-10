import {HiOutlineShoppingBag} from "react-icons/hi2"
import React, { useState } from 'react'
import CartContents from "../cart/CartContents"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"





const CartDrawer = () => {  


const navigate = useNavigate()
const { user, guestId} = useSelector((state) => state.auth);
const { cart } = useSelector((state) => state.cart);
const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;
const userId = user ? user._id : null;

  const handleCheckout = () => {    
    if(!user) {
      navigate("/login?redirect=checkout")
    }else{
      navigate("/checkout")
    } 
  }

  return (
    
    <div>

      <button className="btn mt-3  position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <HiOutlineShoppingBag size={30} style={{ color: '#4b5563' }}/>
          {cartItemCount > 0 && ( <span className="position-absolute  top-0 start-70 translate-middle badge rounded-pill bg-danger">
            {cartItemCount}
        </span>)}
         
        </button>
    

<div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h2 className="offcanvas-title" id="offcanvasRightLabel">Your Cart</h2>
    

    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  {cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId={guestId}/>) : (<p>Your cart is empty.</p>) }
    {/* <CartContents/> */}
  </div>

  {/* checkout button fixed at the bottom */}
  <div className="py-2 px-4 bg-white sticky-bottom ">
  {cart && cart?.products?.length > 0 && (
    <>
    <button  onClick={handleCheckout} 
    className="w-100 bg-danger bg-gradient text-white py-2 rounded hover">Checkout</button>

    <p className="text-secondary px-4 ">Shipping, taxes, and discount codes  calculated at checkout.</p>
    </>
      )}
      </div>
     </div>
     </div>
     
  )
}


export default CartDrawer