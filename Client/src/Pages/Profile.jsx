import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlice'

const Profile = () => {
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login")
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-4  col-md-4  shadow rounded p-5 mb-3 '>
          <h2 className='mb-3'>{user?.name}</h2>
          <p className='mb-3'>{user?.email}</p>
          <button onClick={handleLogout}
           className='w-100 bg-danger text-white py-2 rounded'>LogOut</button>
        </div>

        {/* right side */}
        <div className='col-md-8 '>
          <MyOrdersPage/>
        </div>
      </div>
    </div>





    // <div className='d-flex flex-colmn'>
    //   <div className='flex-grow container mx-auto p-5 p-md-5'>
    //     <div className='d-flex flex-colmn flex-md-row gap-4 '>
    //       {/* left section */}
    //       <div className='w-100 shadow  rounded p-4'>
    //         <h1 className=' mb-3'>John Doe</h1>
    //         <p className='mb-3'>John@example.com</p>
    //         <button className="bg-dark text-white py-2 rounded w-100">
    //           Logout
    //         </button>
    //       </div>
    //       {/* right  section for orders*/}
    //       <div className='w-100'>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Profile