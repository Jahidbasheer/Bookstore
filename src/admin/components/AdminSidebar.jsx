import { faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/Contextshare'

const AdminSidebar = () => {

    const [homeStatus,setHomeStatus]=useState(false)
    const [bookStatus,setBookStatus]=useState(false)
    const [settingStatus,setSettingStatus]=useState(false)
    const [adminDetails, setAdminDetails] = useState({
            username: "",
            profile: ""
        })

    const navigate=useNavigate()
    const{adminProfileStatus}=useContext(adminProfileUpdateContext)

    const pageSwap = (data)=>{
        if(data=='home'){
            navigate('/admin-home')
        }else if(data=='books'){
            navigate('/admin-books')
        }else if(data =='settings'){
            navigate('/admin-settings')
        }else{
            navigate('*')
        }
    }

    useEffect(()=>{
        if(location.pathname=="/admin-home"){
            setHomeStatus(true)
        }else if(location.pathname=="/admin-books"){
            setBookStatus(true)
        }else if(location.pathname=="/admin-settings"){
            setSettingStatus(true)
        }else{
            console.log("no such page");
            
        }
        if(sessionStorage.getItem("existingUser")){
            const userDetail=JSON.parse(sessionStorage.getItem("existingUser"))
            setAdminDetails({username:userDetail.username,profile:userDetail.profile})
        }
    },[adminProfileStatus])

  return (
    <>
        <div className='flex flex-col justify-center items-center'>
            <img src={adminDetails.profile==""?"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png":`${serverURL}/upload/${adminDetails.profile}`} alt="" 
             style={{width:'150px',height:'150px'}} className='rounded-full'/>
    
             <h1 className='mt-5'>{adminDetails.username}</h1>
        </div>

        <div className='m-5'>
            <div className='mb-3' onClick={()=>pageSwap('home')}>
                <input type="radio"  id='home' name='filter' readOnly checked={homeStatus}/>
                <label htmlFor="home" className='mx-3' ><FontAwesomeIcon icon={faHouse} className='me-3'/>Home</label>
            </div>
            <div className='mb-3'  onClick={()=>pageSwap('books')}>
                <input type="radio" id='books' name='filter' readOnly checked={bookStatus}/>
                <label htmlFor="books" className='mx-3' ><FontAwesomeIcon icon={faBook} className='me-3'/>All Books</label>
            </div>
            <div className='mb-3' onClick={()=>pageSwap('settings')}>
                <input type="radio" id='settings' name='filter' readOnly checked={settingStatus}/>
                <label htmlFor="settings" className='mx-3'  ><FontAwesomeIcon icon={faGear} className='me-3'/>Settings</label>
            </div>
        </div>

    </>
  )
}

export default AdminSidebar