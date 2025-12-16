import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { approveBooksAPI, getAllBooksAdminAPI, getAllUsersAPI } from '../../services/allAPIs'
import { toast, ToastContainer } from 'react-toastify'

const AdminBooks = () => {
    const [bookList, setBookList] = useState(true)
    const [userStatus, setUserStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState([])
    const [token, setToken] = useState("")
    const [approveStatus, setApproveStatus] = useState(false)
    const [users, setUsers] = useState([])

    const getAllBooksAdmin = async (token) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

        const result = await getAllBooksAdminAPI(reqHeader)
        console.log(result.data);
        if (result.status == 200) {
            setBookDetails(result.data)
        }

    }

    const approveBook = async (data) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await approveBooksAPI(reqHeader,data)
        console.log(result.data);
        if (result.status == 200) {
            setApproveStatus(true)
        } else {
            toast.error("Something went wrong")
        }

    }

    const getAllUsers = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUsersAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setUsers(result.data)
        }

    }
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            setToken(token)
            getAllBooksAdmin(token)
        }
        if (userStatus == true) {
            getAllUsers()
        }
    }, [approveStatus, userStatus])
    return (
        <>
            <AdminHeader />
            <div className='grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-200'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-3xl text-center mt-4'>All Books</h1>

                    <div className='flex justify-center items-center my-5 mt-7'>
                        <p onClick={() => { setBookList(true); setUserStatus(false) }} className={bookList ? 'p-2 text-blue-600 border-l border-t border-r border-gray-200' : 'p-4 text-black border-gray-200 border-b'}>Book List</p>

                        <p onClick={() => { setBookList(false); setUserStatus(true) }} className={userStatus ? 'p-2 text-blue-600 border-l border-t border-r border-gray-200' : 'p-4 text-black border-gray-200 border-b'}>Users</p>
                    </div>

                    {bookList &&
                        <div className='md:grid grid-cols-4 w-full mt-5 px-10'>
                            {bookDetails?.length > 0 ?
                                bookDetails?.map((item) => (
                                    <div className='p-3'>
                                        <div className={item?.status == 'sold' ? "p-3 shadow-md opacity-58" : "p-3 shadow-md"}>
                                            <img src={item.imageurl} alt="" style={{ width: '200px', height: '200px' }} />
                                            <div className='flex justify-center flex-col items-center mt-3'>
                                                <p className='text-blue-500'>{item?.author}</p>
                                                <p>{item?.title}</p>
                                                <p className='text-blue-500'>${item?.dprice}</p>
                                                {item?.status == 'pending' &&
                                                    <button onClick={() => approveBook(item)} className='bg-green-600 px-3 py-2 w-full mt-2 text-white'>
                                                        Approve
                                                    </button>}
                                                {item?.status == 'approved' &&
                                                    <div className='flex justify-end w-full'>
                                                        <img src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png" alt="" style={{ width: '40px', height: '40px' }} />
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <p>No Books Added...</p>
                            }
                        </div>
                    }

                    {userStatus &&
                        <div className='grid grid-cols-3 p-10'>
                            {users?.length > 0 ?
                                users?.map((item) => (
                                    <div className='bg-gray-100 p-4 md:m-4 mt-4 w-75'>
                                        <p className='text-red-500'>ID:5{item?._id}</p>
                                        <div className='grid grid-cols-[1fr_2fr] mt-3'>
                                            <div className='flex justify-center items-center'><img src={users?.profile==""?"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png":users?.profile} alt="" style={{ width: '70px', height: '70px', borderRadius: "50%" }} /></div>
                                            <div>
                                                <h2>{item?.username}</h2>
                                                <p>{item?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <p>No Users</p>}

                        </div>
                    }
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={2000} />
            <Footer />
        </>
    )
}

export default AdminBooks