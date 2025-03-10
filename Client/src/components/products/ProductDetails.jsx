import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import ProductGrid from './ProductGrid'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slice/productsSlice'
import { addToCart } from '../../redux/slice/cartSlice'

const ProductDetails = ({ productId }) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const {selectedProduct, loading, error, similarProducts} = useSelector((state) => state.products
);

  const {user, guestId} = useSelector((state) => state.auth)
  const [mainImage, setMainImage] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const productFetchId = productId  || id;

  useEffect(() => {
    if(productFetchId) {
      dispatch(fetchProductDetails(productFetchId))
      dispatch(fetchSimilarProducts({id: productFetchId}))      
    }
  }, [dispatch, productFetchId])


  useEffect(() => {
    if( selectedProduct?.images?.length > 0){
      setMainImage(selectedProduct.images[0].url)
    }
   }, [selectedProduct])

  const quantityHandler = (action) => {
   if(action === "plus") setSelectedQuantity((prev) => prev + 1); 
    if(action === "minus" && selectedQuantity > 1)setSelectedQuantity((prev) => prev - 1);
  };


  const addToCartHandler = () => {
 if(!selectedColor || !selectedSize){
 toast.error("Please select  size and color brfore adding to cart.",{
  duration: 1000,
 });
 return;
 }

 setIsButtonDisabled(true);

 dispatch(
 addToCart({
  productId: productFetchId,
  quantity: selectedQuantity,
  size: selectedSize,
  color: selectedColor,
  guestId,
  userId: user?._id,
 })
).then(() => {
  toast.success("Product added to cart!", {
    duration: 1000,
  });
})
.finally(() => {
  setIsButtonDisabled(false)
});
  };

  if(loading) {
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }

  if(!selectedProduct){
    return <p>Product not found.</p>
  }
 

  return (
    <>
      
      
    <div className='mt-5 mb-3'> 
   
    <div className="container bg-light p-5 ">
    <div className="mx-auto row  rounded p-4 ">

      <div className='col-sm-2 d-none d-md-flex flex-column align-items-start'>
      
        {selectedProduct?.images?.map((image,index) => (
          <img key={index}
          src={image.url} 
          alt={image.alt || `Thumbnail ${index}`}
           className={`rounded object-fit-cover mb-2  border ${mainImage === image.url ? "border-info border-2" : "border-light"}`}
          width={80}
          onClick={() => setMainImage(image.url)}
          />
        ))}

      </div> 

      {/* main Image */}
      
       <div className="col-md-6 mb-4">
        <img src={mainImage} alt="Main Product" className="w-100 rounded object-fit-cover" height={550}/>
      
      </div> 

      {/* small screen thumbnail */}
       <div className='col-md-8 d-flex d-md-none flex-row  mb-3 mt-2'>
      {selectedProduct?.images?.map((image,index) => (
          <img key={index}
          src={image.url} 
          alt={image.alt || `Thumbnail ${index}`}
           className={`rounded object-fit-cover mx-2   border ${mainImage === image.url ? "border-info border-2" : "border-light"}`}
          width={70}
          onClick={() => setMainImage(image.url)}/>
        ))}
      </div> 

      {/* Right Side of the screen */}

       <div className="col">
<h2>{selectedProduct?.name}</h2> 

{/* price */}
 <div className='d-flex '>
<p className=' mb-1 text-decoration-line-through' style={{ color: '#4b5563' }} >
  {selectedProduct?.originalPrice && `$ ${selectedProduct.originalPrice}`}
</p>

<p className="mb-2 ms-2" style={{ color: '#4b5563' }}>
  $ {selectedProduct?.price}
  </p>
  </div> 

{/* description */}
   <p className="mb-3" style={{ color: '#4b5563' }}>{selectedProduct?.description}</p>
   
{/* colors */}
   <div className='mb-2 d-flex'> 
    <p style={{ color: '#4b5563' }}>
      Color: </p>

    <div className='ms-2 d-flex gap-2'>
      {selectedProduct?.colors?.map((color) => (
        <button 
        key={color} 
        className={`rounded-circle ${selectedColor === color ? " border-info  border border-3 " : " border-dark "} `}
        style={{backgroundColor: color.toLowerCase(),
        filter: "brightness(0.5)",
        width: 25,
        height: 25 
        }}
         onClick={() => setSelectedColor(color)}> </button>
      ))}
    </div>
    </div> 

    {/* sizes */}
     <div className='mb-2  d-flex'>
      <p className="mt-2" style={{ color: '#4b5563' }}>Size: </p>
      <div className="d-flex gap-2 ms-3 ">{selectedProduct?.sizes?.map((size) => (
        <button key={size}
        onClick={() => setSelectedSize(size)}
        className={`p-2 mb-2 rounded border${selectedSize === size ? " bg-dark text-light ": ""}`}
        >{size}
        </button>
      ))}</div>
      
    </div> 

    {/* quantity */}
     <div className="mb-3 ">
      <p style={{ color: '#4b5563' }}>Quantity: </p>
      <div className='d-flex align-items-center'>
      <button onClick={() => quantityHandler("minus")}className="rounded">
        -
      </button>
      <span className='px-1'> {selectedQuantity} </span>
      <button onClick={() => quantityHandler("plus")}className="rounded">
        +
      </button>
      </div>
    </div>
  
  <button onClick={() => addToCartHandler()}
  disabled={isButtonDisabled}
  className={`bg-dark text-light py-2 px-6 rounded w-100 mb-2 ${isButtonDisabled  ? " bg-opacity-50 disabled" : ""}`}> {isButtonDisabled ? "Adding.." : "ADD TO CART"} 
    </button>

    <div className='mt-2'style={{ color: '#4b5563' }}>
      <h5>Characteristics: </h5>
      <table className='table table-borderless'>
        <tbody>
          <tr>
            <td className='py-1'>Brand</td>
            <td className='py-1'>{selectedProduct?.brand}</td>
          </tr>
          <tr>
            <td className='py-1'>Material</td>
            <td className='py-1'>{selectedProduct?.material}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
   
  
       
       </div>        
    </div>
      

    
  
    <div className='mt-5 '>
    <h2 className='display-5 mb-4 text-center'>
      You May Also Like
    </h2>
    <ProductGrid products={similarProducts} loading={loading} error={error}/>
   </div>
   
   </div>
    </> 
  )
}

export default ProductDetails