import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slice/checkoutSlice'

import axios from 'axios'



const Checkout = () => {
  const navigate = useNavigate()

const dispatch  = useDispatch()
const {cart, loading, error} = useSelector((state) => state.cart)
const {user} = useSelector((state) => state.auth)

  const [checkoutId, setCheckoutId] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  //Ensure cart is loaded before moving forword
  useEffect(() => {
    if(!loading && (!cart || !cart.products || cart.products.length === 0)){
      navigate("/")
    }
  }, [cart, navigate, loading])




  const handleCreateCheckout = async (e) => {
    e.preventDefault()
    try{
    if(cart && cart.products.length > 0){
      const res = await dispatch(
        createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod: "Paypal",
        totalPrice: cart.totalPrice,
      })
    );
    if(res.payload && res.payload._id) {
      setCheckoutId(res.payload._id) 
    }else{
      console.error("checkout creation failed", res)
    }
    }
  }catch(error){
    console.error("error creating checkout: ", error)
  }
}

  const handlePaymentSuccess = async (details) => {


    if(!checkoutId){
      console.error("checkout Id is missing")
      return
    }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
      {paymentStatus: "paid", paymentDetails: details},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );   
      await handleFinalizeCheckout(checkoutId);    
  } catch (error) {
    console.error("payment processing failed",error)
  }
  };

  const handleFinalizeCheckout =  async (checkoutId) => {
    try {
       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      
        navigate("/order-confirmation")
      
    } catch (error) {
      console.log("Error finalizing checkout: ",error)
      return;
    }
  }

  if(loading) return <p>Loading Cart ...</p>
  if(error) return  <p>Error: {error}</p>
  if(!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (<div className='container py-3'>
    <h1 className='py-2 text-center' style={{ fontFamily: "Roboto" }}>CHECKOUT</h1>
  
    {/* This will reverse the order on small screens and normal on medium+ screens */}
    <div className="d-flex flex-column-reverse flex-md-row gap-5">
      
      {/* Order Summary (Appears on Top in Small Screens) */}
      <div className='col-md-6 bg-light'>
        <h3 className='ms-3 py-3'>Order Summary</h3>
        <div className='border-top py-3 mb-3 mx-3'>
          {cart.products.map((product, index) => (
            <div key={index} className='d-flex align-items-center justify-content-between py-2 border-bottom'>
              <div className='d-flex'>
                <img src={product.image} alt={product.name} className='object-cover me-4' height={100} />
                <div>
                  <h5>{product.name}</h5>
                  <p className='text-muted'><strong>Size:</strong> {product.size}</p>
                  <p className='text-muted'><strong>Color:</strong> {product.color}</p>
                </div>
              </div>
              <p className='fw-bold'>${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className='px-3 d-flex justify-content-between align-items-center mb-3'>
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="px-3 d-flex justify-content-between align-items-center">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="mx-3 d-flex justify-content-between align-items-center mt-3 border-top pt-3">
          <p className="fs-4 fw-bold">Total Amount</p>
          <p className='fs-5 fw-bold'>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
  
      {/* Delivery Form (Appears Below in Small Screens, Normal in Large Screens) */}
      <div className="col-md-6">
        <div className="rounded pb-5 pt-2">
          <form className="ms-5" onSubmit={handleCreateCheckout}>
            <h3 className='mb-3'>Contact Details</h3>
            <div className="mb-2">
              <label className="d-block">Email</label>
              <input type="email" value={user ? user.email : ""} className='w-100 py-2 border rounded' disabled />
            </div>
  
            <h3 className="mb-2">Delivery</h3>
            <div className='row mb-2'>
              <div className='col'>
                <label className='d-block'>First Name</label>
                <input type="text" value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} className="w-100 p-2 border rounded" required />
              </div>
  
              <div className='col'>
                <label className='d-block'>Last Name</label>
                <input type="text" value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} className="w-100 p-2 border rounded" />
              </div>
            </div>
  
            <div className="mb-2">
              <label className="d-block">Address</label>
              <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className="w-100 p-2 border rounded" required />
            </div>
  
            <div className='row'>
              <div className='col'>
                <label className='d-block'>City</label>
                <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-100 p-2 border rounded" required />
              </div>
  
              <div className='col'>
                <label className='d-block'>Postal Code</label>
                <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} className="w-100 p-2 border rounded" required />
              </div>
            </div>
  
            <div className="mb-2">
              <label className="d-block">Country</label>
              <input type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} className="w-100 p-2 border rounded" required />
            </div>
  
            <div className="mb-2">
              <label className="d-block">Phone</label>
              <input type="text" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} className="w-100 p-2 border rounded" required />
            </div>
  
            <div className='mt-4'>
              {!checkoutId ? (
                <button type="submit" className='w-100 bg-danger bg-gradient text-white py-2 rounded'>Continue to Payment</button>
              ) : (
                <div>
                  <h5 className='mb-3'>Pay With Paypal</h5>
                  <PayPalButton amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed. Try again.")} />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
  
    </div>
  </div>
  )
}

export default Checkout
