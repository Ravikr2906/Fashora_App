import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {setFilters} from "../../redux/slice/productsSlice"
import { fetchProductsByFilters } from '../../redux/slice/productsSlice'

const Searchbar = () => {
// const [searchTerm, setSearchTerm] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const handleSearchToggler = () => {
    setIsOpen(!isOpen)
  }


  const handleSearch = (e) => {
      e.preventDefault();
 dispatch(setFilters({ search: searchTerm }));
 dispatch(fetchProductsByFilters({ search: searchTerm }));
 navigate(`/collections/all?search=${searchTerm}`);
  setIsOpen(false)
  }

  return (
    <div className={`py-2  d-flex align-items-center justify-content-center w-100  ${isOpen ? "position-absolute top-10 start-0 w-100 bg-white" : "w-auto"}`}>
      {isOpen ? (
      <form onSubmit={handleSearch} className='position-relative d-flex align-item-center justify-content-center w-100 '>
<div className='position-relative w-50'>

  <input type="text" placeholder='Search' value={searchTerm} 
  onChange={(e) => setSearchTerm(e.target.value)}
  className='bg-light form-control   rounded '/>


  {/* search-Icon */}
  <button type="submit" className='position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent'>
    <HiMagnifyingGlass size={30}/>
  </button>
</div>

{/* Close Button */}
<button type='button' 
onClick={handleSearchToggler}
className='position-absolut end-4 top-50 bg-transparent border-0 '>
  <HiMiniXMark size={30}/>
</button>
      </form>) : (
<button className='btn btn-white mt-3' onClick={handleSearchToggler}>
  <HiMagnifyingGlass size={30} style={{ color: '#4b5563' }}/>
</button>
      )}
    </div>
  )
}

export default Searchbar