import React from 'react'
import Topbar from '../layout/Topbar'
import Navbar from './Navbar'
const Header = () => {
  return (
  <>
   {/* Top bar */}
 <Topbar/>
   {/* Navbar */}
   <header className='border-bottom border-color-secondary'>
   <Navbar/>
   {/* cart Drawer */}
   </header>
   </>
  )
}

export default Header