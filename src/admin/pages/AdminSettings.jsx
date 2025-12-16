import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'
import { adminProfileUpdateAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/Contextshare'


const AdminSettings = () => {

    const{setAdminProfileStatus}=useContext(adminProfileUpdateContext)

    const [adminDetails, setAdminDetails] = useState({
        username: "",
        password: "",
        cPassword: "",
        profile: ""
    })

    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingImg, setExistingImg] = useState("")
    const [updateStatus, setUpdateStatus] = useState({})

    const handleFileAdd = (e) => {
        const event = e.target.files[0]
        setAdminDetails({ ...adminDetails, profile: event })
        console.log(adminDetails.profile);

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
            setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
            setExistingImg(user.profile)
        }
        setPreview("")
    }

    // Update
    const handleUpdate = async () => {
        const { username, password, cPassword, profile } = adminDetails
        console.log(username, password, cPassword, profile);

        if (!username || !password || !cPassword ) {
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

                    for (let key in adminDetails) {
                        reqBody.append(key, adminDetails[key])
                    }

                    const result = await adminProfileUpdateAPI(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success("Profile Updated...")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminProfileStatus(result.data)
                    } else {
                        toast.error("Somethimg went wrong...")
                        setUpdateStatus({})
                    }
                } else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }

                    const result = await adminProfileUpdateAPI({ username, password, profile: existingImg }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success("Profile Updated...")
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminProfileStatus(result.data)
                    } else {
                        toast.error("Somethimg went wrong...")
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
            setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
            setExistingImg(user.profile)
        }
    }, [updateStatus])



    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-3xl text-center mt-6'>Settings</h1>
                    <div className='flex justify-center items-center mt-5 p-20'>
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in non, eos pariatur ex perspiciatis doloribus, explicabo repellendus ullam molestias nobis quasi fugiat corporis enim aut aspernatur cum, est nisi?</p>

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet optio quos iste est minus culpa, tempore harum dolore vero dolorum? Tenetur animi quibusdam laudantium eos ut accusantium quam qui </p>
                        </div>
                        <div className='mx-3'>
                            <div className='bg-blue-200 flex flex-col justify-center items-center p-10 rounded'>

                                <div>
                                    <label htmlFor="profilefile">
                                        <input onChange={(e) => handleFileAdd(e)} type="file" id='profilefile' style={{ display: 'none' }} />

                                        {existingImg == "" ?
                                            <img className='rounded-full'
                                                src={preview ? preview : "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}
                                                alt=""
                                                style={{ width: '150px', height: '150px' }} />
                                            :
                                            <img className='rounded-full'
                                                src={preview ? preview : `${serverURL}/upload/${existingImg}`}
                                                alt=""
                                                style={{ width: '150px', height: '150px' }} />
                                        }

                                        <div className='bg-yellow-300 z-53 text-white p-3 rounded' style={{marginLeft:'145px',marginTop:'-50px'}}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </div>
                                    </label>
                                </div>



                                <div className='mt-15'>

                                    <div className='mb-3'>
                                        <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                    <div className='mb-3'>
                                        <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                    <div className='mb-3'>
                                        <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='p-2 bg-white rounded placeholder-gray-400 w-100' />
                                    </div>
                                </div>

                                <div className='flex justify-center items-center mb-8 mt-5'>
                                    <button type='button' onClick={handleReset} className='px-3 py-2 bg-amber-600 rounded me-2 w-50'>Reset</button>
                                    <button type='button' onClick={handleUpdate} className='px-3 py-2 bg-green-500 rounded w-50'>Update</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={2000} />
            <Footer />
        </>
    )
}

export default AdminSettings