import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {fetchOrderDetails} from '../redux/slice/orderSlice'

const OrderDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error}</p>;

  return (
    <div className="container w-75 p-3 ">
      <h2 className="mb-3">Order Details</h2>
      {!orderDetails ? (<p>No Order Details found</p>) : (
        <div className=' p-3 shadow rounded border'>
          <div className="d-flex flex-colum  flex-sm-row justify-content-between mb-2">
            <div>
              <h5>Order Id: #{orderDetails._id}</h5>
              <p>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            </div>
            <div className=" d-flex flex-column align-items-start align-items-sm-end">
            <span 
  style={{ backgroundColor: orderDetails.isPaid ? "#40fa9e" : "#fe5151" }}
  className="px-2 py-1 rounded-pill mb-2 "
>
  {orderDetails.isPaid ? "Approved" : "Pending"}
  
</span>

<span 
  style={{ backgroundColor: orderDetails.isDelivered ? "#40fa9e" : "#f9fe47" }}
  className="px-2 py-1 rounded-pill mb-2 "
>
  {orderDetails.isDelivered ? "Deleverd" : "Pending"}
  
</span>

            </div>
          </div>

          {/* Customer, Payment, shipping info */}

          <div className='row gap-3'>
            <div className="col-md-4 ">
              <div>
           <h5 className="mb-2">Payment Info</h5>
           <p>Payment Method: {orderDetails.paymentMethod}</p>
           <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
           </div>
            </div>

            <div className="col-md-4 mb-3">
              <div>
           <h5 className="mb-2">Shipping Info</h5>
           <p>Shipping Method: {orderDetails.shippingMethod} </p>
           <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`} </p>
           </div>
            </div>
          </div>

          {/* products list */}
            <div className=' row overflow-auto'>
              <h4 className='mb-3'> Products</h4>
              <table className="min-w-100 mb-3">
                <thead className='bg-light'>
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className='border-bottom'>
                      <td className="py-2 px-4 d-flex align-items-center">
                        <img src={item.image}
                        alt={item.name}
                        className="object-cover rounded me-4" height={65}/>

                        <Link to={`/product/${item.productId}`}>{item.name}
                        </Link>
                      </td>
                      
                      <td className="py-2 px-4">${item.price}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">${item.price * item.quantity}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* back to orders link  */}
            <Link to="/my-orders">Back to My Orders</Link>
      </div>
    )}
    </div>
  )
}

export default OrderDetails