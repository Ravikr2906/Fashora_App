import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/products/FilterSidebar'
// import SortOptions from '../components/products/SortOptions'
import ProductGrid from '../components/products/ProductGrid'

import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../redux/slice/productsSlice'
// import { use } from 'react'


const CollectionPage = () => {
  const  { collection } = useParams() 

  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const { products, loading, error } = useSelector((state) => state.products)
  
  const queryParams = Object.fromEntries([...searchParams])
 

  // const sidebarRef = useRef(null)
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));

  }, [dispatch, collection, searchParams]);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  //  close side bar if click outside of the bar
  //  const handleClickOutside = (e) => {
  //   if(sidebarRef.current && ! sidebarRef.current.contains(e.target)){
  //     setIsSidebarOpen(false)
  //   }
  //  }

  //event listener for click
  //    useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside)
  // return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  // } 
  //   }, [])


 // useEffect(() => {
 //   const fetchedProducts = [
 //     {
 //       _id: 1,
 //       name: "Product 1",
 //       price: 100,
 //       images: [{url: "https://picsum.photos/500/500?random=2"}]
 //     }
 //   ]
 // })


  return (
    
    
      <div className='row my-2'>
        {/* side bar */}
        <div className='mx-3 d-none d-lg-block col-lg-2 mb-3'>
          <h2 className='ms-4'>Filters</h2>
          <FilterSidebar />
        </div>

        {/* mobile view */}
        <div className='d-lg-none row justify-content-center align-items-center '>
          <button className="btn btn-secondary opacity-50 py-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><FaFilter /> Filters</button>

          <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title " id="offcanvasScrollingLabel" >Filters</h2>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              {/* <p>Try scrolling the rest of the page to see this option in action.</p> */}
              <FilterSidebar />
            </div>
          </div>
        </div>

        <div className='col-lg-9 bg-light'>
          <h3 className='display-5 mb-5 text-center'>ALL COLLECTION</h3>
          <ProductGrid products={products}  loading={loading} error={error}/>
        </div>
      </div>



    
  )
}

export default CollectionPage