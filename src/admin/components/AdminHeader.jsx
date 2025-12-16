import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const navigate =useNavigate()
  const logout=()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <>
    <div className='flex justify-between px-20 p-3'>
        <div className='flex items-center'>
            <img src="https://images.vexels.com/media/users/3/324280/isolated/preview/9d52451aee79d0393830d6dca2afe6b7-book-icon-in-red-color.png" alt="" style={{width:'50px',height:'50px'}}/>
            <h1 className='ms-3 font-medium text-2xl'>BOOKSTORE</h1>
        </div>

        <button onClick={logout} className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='me-3'/>Logout</button>

    </div>

    <marquee  direction="left" className='p-3 bg-gray-900 text-white'>Welcome Admin ! You are all set to manage and monitor the system,Let's get to work!</marquee>
    </>
  )
}

export default AdminHeader