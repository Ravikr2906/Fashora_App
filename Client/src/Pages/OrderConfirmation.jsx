import React, { useEffect } from 'react'
import { CiFaceSmile } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {clearCart} from "../redux/slice/cartSlice"





const OrderConfirmation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {checkout} = useSelector((state) => state.checkout)

  //clear the cart when the order is confirmed
  useEffect(() => {
    if(checkout && checkout._id){
      dispatch(clearCart());
      localStorage.removeItem("cart")
    }else{
      navigate("/my-orders")
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 3) // Add 3 days from the order date
    return orderDate.toLocaleDateString()
  }


  return (
    <div className="container w-75  p-4 ">
    <h1 className='text-center mb-4 text-success'>
      Thank You for Your Order <CiFaceSmile size={60} />
    </h1>

    {checkout && (
      <div className='p-3 rounded border border-2'>
        <div className="d-flex flex-column flex-md-row  justify-content-between mb-3">  
          {/* Order id and date */}
          <div className='text-wrap overflow-hidden'>
        <h4 className='fs-5 text-break'>Order ID: {checkout._id}</h4>
        <p >Order date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
        </div> 

       {/* estimated Delivery */}
        <div className='mt-2 mt-md-0'>
         <p className='text-success fs-5'>Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}</p>
        </div>
        </div>
        {/* orderd Items */}
        <div className='mb-4'>
          {checkout.checkoutItems.map((item) => (
            <div key={item.productId}
            className='d-flex align-items-center mb-3 border-top py-1'>
              <img src={item.image} alt={item.name} className='object-cover rounded me-4' height={80}/>
              <div>
                <h4>{item.name}</h4>
                <p>{item.color} | {item.size}</p>
              </div>
              <div className='ms-auto text-end'>
                <p className=' fw-bold'>${item.price}</p>
                <p  className=' fw-bold'>Qty: {item.quantity}</p>
                
              </div>
            </div>
          ))}
        </div>
        {/* payment and delivery info */}
        <div className="row">
          <div className="col">
            <h5 className='mb-2'>Payment</h5>
            <p className='text-muted fs-5'>Paypal</p>
          </div>
          <div className='col'>
           <h5>Delivery</h5>
           <p className='text-muted'>{checkout.shippingAddress.address}<br/> {checkout.shippingAddress.city}, {" "} {checkout.shippingAddress.country}</p>
          
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default OrderConfirmation
