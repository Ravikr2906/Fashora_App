import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className='bg-danger bg-gradient text-white py-2'>
      <div className='container d-flex align-items-center justify-content-between'>

        
        <div className='d-none d-md-flex  gap-3'>
          <a href="#" className='icon-link icon-link-hover link-light'>
            <TbBrandMeta size={25}/>
          </a>
          <a href="#" className='icon-link icon-link-hover link-light'>
            <IoLogoInstagram size={25} />
          </a>
          <a href="#" className='icon-link icon-link-hover link-light'>
            <RiTwitterXLine size={25}/>
          </a>
        </div>

      
        <div className='text-center w-100'>
          <span>Fashion at Your Fingertips!</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar
