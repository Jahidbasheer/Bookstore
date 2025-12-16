import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../../services/serverURL'
import { userProfileUpdateAPI } from '../../services/allAPIs'
import { toast, ToastContainer } from 'react-toastify'
import { userProfileUpdateContext } from '../../context/Contextshare'

const EditProfile = () => {

    const{setUserProfileStatus}=useContext(userProfileUpdateContext)

    const [offCanvasStatus,setOffCanvasStatus]=useState(false)
    const [userDetails, setUserDetails] = useState({
            username: "",
            password: "",
            cPassword: "",
            profile: "",
            bio:""
        })
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingImg, setExistingImg] = useState("")
    const [updateStatus, setUpdateStatus] = useState({})

    // image add

    const handleFileAdd = (e) => {
        const event = e.target.files[0]
        setUserDetails({ ...userDetails, profile: event })
        console.log(userDetails.profile);

        if (event != "") {
            const url = URL.createObjectURL(event)
            setPreview(url)
        }

    }
    console.log(preview);

    // reset
    const handleReset = () => {
        if (sessionStorage.getItem('token')) {
            // const token = sessionStorage.getItem('token')
            // setToken(token)
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({ username: user.username, password: user.password, cPassword: user.password ,bio: user.bio })
            setExistingImg(user.profile)
        }
        setPreview("")
    }

    // Update
        const handleUpdate = async () => {
            const { username, password, cPassword, profile, bio } = userDetails
            console.log(username, password, cPassword, profile, bio);
    
            if (!username || !password || !cPassword || !bio) {
                toast.info("Please Enter Details")
            } else {
                if (password != cPassword) {
                    toast.warning("Passwords Must match...!!")
                } else {
                    if (preview) {
                        const reqHeader = {
                            "Authorization": `Bearer ${token}`
                        }
                        const reqBody = new FormData()
    
                        for (let key in userDetails) {
                            reqBody.append(key, userDetails[key])
                        }
    
                        const result = await userProfileUpdateAPI(reqBody, reqHeader)
                        console.log(result);
                        if (result.status == 200) {
                            toast.success("Profile Updated...")
                            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                            setUpdateStatus(result.data)
                            setOffCanvasStatus(false)
                            setUserProfileStatus(result.data)
                        } else {
                            toast.error("Somethimg went wrong...")
                            handleReset()
                            setUpdateStatus({})
                        }
                    } else {
                        const reqHeader = {
                            "Authorization": `Bearer ${token}`
                        }
    
                        const result = await userProfileUpdateAPI({ username, password, profile: existingImg ,bio }, reqHeader)
                        console.log(result);
                        if (result.status == 200) {
                            toast.success("Profile Updated...")
                            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                            setUpdateStatus(result.data)
                            setOffCanvasStatus(false)
                            setUserProfileStatus(result.data)
                        } else {
                            toast.error("Somethimg went wrong...")
                            handleReset()
                            setUpdateStatus({})
                        }
                    }
                }
    
    
            }
        }

    useEffect(() => {
            if (sessionStorage.getItem('token')) {
                const token = sessionStorage.getItem('token')
                setToken(token)
                const user = JSON.parse(sessionStorage.getItem("existingUser"))
                setUserDetails({ username: user.username, password: user.password, cPassword: user.password ,bio: user.bio})
                setExistingImg(user.profile)
            }
        },[updateStatus])
  return (
    <>
        <div>
            <button onClick={()=>setOffCanvasStatus(true)} 
            className='text-blue-600 rounded p-3'>{" "}
                <FontAwesomeIcon icon={faPenToSquare} />Edit</button>
        </div>

        {offCanvasStatus&& (
            <div>
                <div className='fixed inset-0 bg-gray-500/75 transition-opacity' aria-hidden='true'>
                </div>

                <div className='bg-white h-full w-90 fixed z-50 top-0 left-0'>

                    <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                        <h1>Edit User Profile</h1>
                        <FontAwesomeIcon onClick={()=>setOffCanvasStatus(false)} 
                        icon={faXmark}/>
                    </div>

                    <div className='flex justify-center items-center flex-col'>
                        <label htmlFor="profilefile">
                            <input onChange={(e)=>handleFileAdd(e)} type="file" id='profilefile' style={{display:'none'}}/>

                            { existingImg==""?
                                <img src={preview?preview:"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"} 
                            alt="" style={{width:'170px',height:'170px'}} className='rounded-full'/>
                            :
                            existingImg.startsWith("https://lh3.googleusercontent.com")  ?
                            
                            <img src={preview?preview:existingImg} 
                            alt="" style={{width:'170px',height:'170px'}} className='rounded-full'/>  :
                           
                            <img src={preview?preview:`${serverURL}/upload/${existingImg}`} 
                            alt="" style={{width:'170px',height:'170px'}} className='rounded-full'/>

                            }

                            <div className='bg-yellow-300 z-53 text-white p-4 rounded' style={{marginLeft:'165px',marginTop:'-50px'}}>
                                <FontAwesomeIcon icon={faPen}/>
                            </div>
                        </label>

                        <div className='mb-3 mt-5 w-full px-5'>
                            <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
                        </div>

                        <div className='mb-3 mt-5 w-full px-5'>
                            <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
                        </div>

                        <div className='mb-3 mt-5 w-full px-5'>
                            <input value={userDetails.cPassword} onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
                        </div>

                        <div className='mb-3 mt-5 w-full px-5'>
                            <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} placeholder='Bio' rows={5} className='w-full border border-gray-300 placeholder-gray-200 p-2 rounded' />
                        </div>

                        <div className='flex'>
                            <button onClick={handleReset} type='button' className='bg-amber-600 text-black p-3 mx-3 rounded hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>

                            <button onClick={handleUpdate} type='button' className='bg-green-600 text-white p-3 rounded hover:bg-white hover:border hover:border-green-600 hover:text-green-600'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <ToastContainer position='top-center' autoClose={2000} />
    </>


  )
}

export default EditProfile