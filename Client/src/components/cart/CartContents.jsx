import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice'

const CartContents = ({cart, userId, guestId}) => {
 const dispatch = useDispatch()

 //handle addind or substracting cart
 const handleAddToCart = (productId, delta, quantity, size, color) => {
  const newQuantity = quantity + delta;
  if(newQuantity >= 1){
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      })
    );
  }
 };

 const handleRemoveFromCart = (productId, size, color) => {
  dispatch(removeFromCart({productId,guestId,userId,size,color}));
 };

  return (
    <div>
      {/* <ul> */}
      {cart.products.map((product, index) => (
          <div key={index} className='d-flex items-start justify-content-between py-4 border-bottom'>
             
            <div className='d-flex items-start'>
                 <img src={product.image} alt="Product-img" className='object-cover  rounded' height={200} width={150}/>
                 <div className='ms-3'>
                  <h5>{product.name}</h5>
                  <p>
                    Size: {product.size} | Color: {product.color}
                  </p>
                  <div className='d-flex align-items-center mt-2'>
                    <button onClick={() => handleAddToCart(product.productId, -1, product.quantity,product.size, product.color) } 
                    className='border rounded px-2 py-1 '>
                      - </button>
                      <span className='mx-4'>{product.quantity}</span>

                    <button onClick={() => 
                      handleAddToCart(product.productId, 
                      1, 
                      product.quantity,
                      product.size, 
                      product.color
                      ) }  
                      className='border rounded px-2 py-1'>
                      + </button>
                    </div>
                  </div>
                  <div className='mt-2 ms-2'>
                  <p className='ms-3'>${product.price.toLocaleString()}</p>
                  <button onClick={() => 
                    handleRemoveFromCart(product.productId,
                     product.size,
                      product.color)} 
                      className='btn btn-transparant'>
                    <RiDeleteBin3Line size={30} className='text-danger'/>
                  </button>
                 </div> 
            </div>
            </div>
        ))
        
        }
      {/* </ul> */}
    </div>
  )
}

export default CartContents
