import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {fetchUserOrders} from "../redux/slice/orderSlice"

const MyOrdersPage = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {orders, loading, error} = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

 

  const handleRowClick = (orderId) => {
navigate(`/order/${orderId}`)

  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="container py-4">
      <h2 className="mb-3">My Orders</h2>
  
      {/* Responsive Table Wrapper */}
      <div className="table-responsive shadow rounded">
        <table className="table table-bordered table-hover">
          <thead className="table-light text-uppercase">
            <tr>
              <th className="py-2 px-3">Image</th>
              <th className="py-2 px-3">Order_ID</th>
              <th className="py-2 px-3">Created</th>
              <th className="py-2 px-3">Shipping_Address</th>
              <th className="py-2 px-3">Items</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}
                onClick={() => handleRowClick(order._id)}>
                  <td className="py-2 px-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="rounded"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td className="py-2 px-2">#{order._id}</td>
                  <td className="py-2 px-2 text-muted">{new Date(order.createdAt).toLocaleDateString()}
                  {new Date(order.createdAt).toLocaleTimeString()}
                  </td>

                  <td className="py-2 px-2 text-muted">
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </td>
                  <td className="py-2 px-2 text-muted">{order.orderItems[0].name}</td>

                  <td className="py-2 px-2 text-muted">${order.totalPrice}</td>
                  
                  <td className="py-2 px-2">
                    {order.isPaid ? (
                      <span className="text-success fw-bold">Paid</span>
                    ) : (
                      <span className="text-danger fw-bold">Unpaid</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 px-4 text-center">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  };

export default MyOrdersPage;
