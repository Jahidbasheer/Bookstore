import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookAPI, deleteAUserBookAPI, getAllUserBooksAPI, getAllUserBroughtBooksAPI } from '../../services/allAPIs'
import { userProfileUpdateContext } from '../../context/Contextshare'
import { serverURL } from '../../services/serverURL'

const Profile = () => {
    const [sellStatus, setSellStatus] = useState(true)
    const [userBookStatus, setUserBookStatus] = useState(false)
    const [purchaseStatus, setPurchaseStatus] = useState(false)
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        noofpages: '',
        imageurl: '',
        price: '',
        dprice: '',
        Abstract: '',
        publisher: '',
        language: '',
        isbn: '',
        category: '',
        uploadedImages: []
    })
    const [preview, setPreview] = useState('')
    const [previewList, setPreviewList] = useState([])
    const [token,setToken]=useState("")
    const [profile, setProfile] = useState("")
    const [userBooks, setUserBooks] = useState([])
    const [userBroughtBooks, setUserBroughtBooks] = useState([])
    const [deleteStatus,setDeleteStatus]=useState("")

    const{userProfileStatus}=useContext(userProfileUpdateContext)

    const handleUpload = (e) => {
        console.log(e.target.files[0]);
        const fileArray = bookDetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({ ...bookDetails, uploadedImages: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setPreview(url)

        const newArray = previewList
        newArray.push(url)
        setPreviewList(newArray)


    }

    const handleReset = ()=>{
        setBookDetails({title: '',author: '',noofpages: '',imageurl: '',price: '',dprice: '',Abstract: '',publisher: '',language: '',
        isbn: '',category: '',uploadedImages: []
        })
        setPreview('')
        setPreviewList([])
    }

    const handleSubmit =async()=>{
        const {title, author, noofpages, imageurl, price, dprice, Abstract, publisher, language, isbn, category , uploadedImages} = bookDetails

        if(!title || !author || !noofpages || !imageurl || !price || !dprice || !Abstract || !publisher || !language || !isbn || !category || uploadedImages.length==0){
            toast.warning("Please fill the fields!!!")
        }else{
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()
            
            for(let key in bookDetails){
                if(key!='uploadedImages'){
                    reqBody.append(key,bookDetails[key])
                }else{
                    bookDetails.uploadedImages.forEach((item)=>{
                        reqBody.append("uploadedImages",item)
                    })
                }
            }
            
            const result = await addBookAPI(reqBody,reqHeader)
            console.log(result);

            if(result.status ==401){
                toast.warning(result.response.data)
                handleReset()
            }else if(result.status ==200){
                toast.success("Book Added Succefully")
                handleReset()
            }else{
                toast.error("Something went wrong")
                handleReset()
            }
            
        }
    }

    const getAllUserBooks = async()=>{
        const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
        const result= await getAllUserBooksAPI(reqHeader)
        console.log(result);
        if(result.status==200){
            setUserBooks(result.data)
            console.log(userBooks);
            
        }
        
    }

    const getAllUserBroughtBooks = async()=>{
        const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
        const result= await getAllUserBroughtBooksAPI(reqHeader)
        console.log(result);
        if(result.status==200){
            setUserBroughtBooks(result.data)
            
            
        }
        
    }
    console.log(userBroughtBooks);

    const deleteBook = async(id)=>{
        const result = await deleteAUserBookAPI(id)
        console.log(result);
        toast.success(result.data)
        if(result.status==200){
            setDeleteStatus(result.data)
        }
        
    }

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            const token =sessionStorage.getItem('token')
            setToken(token)
            const userDetail=JSON.parse(sessionStorage.getItem("existingUser"))
            setProfile(userDetail.profile)
        }
    },[userProfileStatus])

    useEffect(()=>{
        if(userBookStatus==true){
            getAllUserBooks()
        }else if(purchaseStatus==true){
            getAllUserBroughtBooks()
        }else{
            console.log("Something went wrong!!!");
            
        }
    },[userBookStatus,purchaseStatus,deleteStatus])

    return (
        <>
            <Header />
            <div style={{ height: '200px' }} className='bg-gray-900'></div>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-150px' }} className='bg-white p-3'>
                <img src={profile=="" ?  "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg" 
                :  profile.startsWith("https://lh3.googleusercontent.com")
                ?  profile :  `${serverURL}/upload/${profile}`}
                 alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            </div>
            <div className='flex px-20 mt-5 justify-between'>
                <p className='flex justify-center items-center'>
                    <span className='text-3xl'>Jahid</span>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400 ms-3' />
                </p>
                <div className='flex justify-end'><EditProfile /></div>

            </div>
            <p className='md:px-20 my-4 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima corporis molestiae unde ducimus impedit, vero, ipsum vitae recusandae quo soluta, ab suscipit nobis iusto consequuntur dolorem placeat repudiandae? Obcaecati, aliquid.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae impedit at consequuntur dignissimos recusandae tempora velit eveniet modi. Repellendus iste reiciendis aperiam sunt, pariatur deleniti molestiae tempore officia illo provident.
            </p>

            {/* tabs */}
            <div className='flex justify-center items-center my-5'>
                <p onClick={() => { setSellStatus(true); setUserBookStatus(false); setPurchaseStatus(false) }} className={sellStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200' : userBookStatus ? 'p-4 text-black border-gray-200 border-b' : 'p-4 text-black border-gray-200 border-b'}>Sell Books</p>

                <p onClick={() => { setSellStatus(false); setUserBookStatus(true); setPurchaseStatus(false) }} className={userBookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200' : sellStatus ? 'p-4 text-black border-gray-200 border-b' : 'p-4 text-black border-gray-200 border-b'}> Book Status </p>

                <p onClick={() => { setSellStatus(false); setUserBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200' : sellStatus ? 'p-4 text-black border-gray-200 border-b' : 'p-4 text-black border-gray-200 border-b'}>Purchase History</p>
            </div>

            {/* content */}

            {sellStatus &&
                <div className='bg-gray-200 p-10 m-20'>
                    <h1 className='text-center text-3xl font-medium'>Book Details</h1>
                    <div className='md:grid grid-cols-2 mt-5 w-full'>
                        <div className='px-3'>

                            <div className='mb-3'>
                                <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.noofpages} onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} type="text" placeholder='No of Pages' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.imageurl} onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} type="text" placeholder='Image URL' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} type="text" placeholder='dPrice' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <textarea rows={5} value={bookDetails.Abstract} onChange={(e) => setBookDetails({ ...bookDetails, Abstract: e.target.value })} placeholder='Abstract' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                        </div>

                        <div className='px-3'>
                            <div className='mb-3'>
                                <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>
                            <div className='mb-3'>
                                <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='p-2 bg-white rounded placeholder-gray-300 w-full' />
                            </div>

                            <div className='mb-3 flex justify-center items-center w-full'>
                                {!preview ?
                                    <label htmlFor="imageFile">
                                        <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <img src="https://www.pngkit.com/png/full/129-1298005_png-file-upload-image-icon-png.png" alt="" style={{ width: '200px', height: '200px' }} />
                                    </label>
                                    :
                                    <img src={preview} alt="" style={{ width: '200px', height: '200px' }} />
                                }
                            </div>
                            {preview &&
                                <div className='flex justify-center items-center'>
                                    {previewList?.map((item) => (
                                        <img src={item} alt="" style={{ width: '70px', height: '70px' }} />
                                    ))}

                                    {previewList.length<3 &&
                                        <label htmlFor="imageFile">
                                            <input type="file" id='imageFile' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                            <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3' />
                                        </label>
                                    }


                                </div>}
                        </div>

                    </div>

                    <div className='flex justify-end'>
                        <button onClick={handleReset} className='bg-amber-600 rounded text-black p-3 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>

                        <button onClick={handleSubmit} className='bg-green-600 rounded text-black p-3 hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ms-3'>Submit</button>

                    </div>
                </div>
            }

            {userBookStatus &&
                <div className='p-10 my-20 shadow rounded'>
                   {userBooks?.length>0 ? 
                   userBooks?.map((item)=>(
                    <div className='bg-gray-200 p-5 rounded m-2'>
                        <div className='md:grid grid-cols-[3fr_1fr]'>
                            <div>
                                <h1 className='text-2xl'>{item?.title}</h1>
                                <h2>{item?.author}</h2>
                                <h3 className='text-blue-600'>$ {item?.dprice}</h3>
                                <p>Abstract : {item?.Abstract}</p>
                                <div className='flex'>
                                    {item?.status=="pending"?
                                    <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" style={{ width: '80px', height: '60px' }} />
                                    : item?.status=="approved" ?
                                    <img src="https://png.pngtree.com/png-clipart/20250115/original/pngtree-approved-stamp-with-tick-and-ribbon-look-vector-png-image_20183852.png" alt="approved" style={{ width: '60px', height: '60px' }} />
                                    :
                                    <img src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-circle-sold-red-stamp-with-texture-vector-png-image_19293935.png" alt="sold" style={{ width: '70px', height: '60px' }} />}
                                </div>

                            </div>
                            <div>
                                <img src={item?.imageurl} alt="" style={{ height: '300px', width: '200px' }} className='w-full' />
                                <div className='flex justify-end mt-4'>
                                    <button onClick={()=>deleteBook(item?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                </div>

                            </div>
                        </div>
                    </div>
                   ))
                   

                    :
                    // no books

                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://assets-v2.lottiefiles.com/a/ba63632a-1176-11ee-9737-5f2bb626332f/S1wVGMQqbK.gif" alt="no books" style={{ width: '200px', height: '200px' }} />
                        <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
                    </div>}
                </div>
            }

            {purchaseStatus &&
               <div className='p-10 my-20 shadow rounded'>
                {console.log(userBroughtBooks)}
                   {userBroughtBooks?.length>0 ? 
                   userBroughtBooks?.map((item)=>(
                    <div className='bg-gray-200 p-5 rounded m-2'>
                        <div className='md:grid grid-cols-[3fr_1fr]'>
                            <div>
                                <h1 className='text-2xl'>{item?.title}</h1>
                                <h2>{item?.author}</h2>
                                <h3 className='text-blue-600'>$ {item?.dprice}</h3>
                                <p>Abstract : {item?.Abstract}</p>
                                <div className='flex'>
                                    {item?.status=="pending"?
                                    <img src="https://psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png" alt="pending" style={{ width: '80px', height: '60px' }} />
                                    : item?.status=="approved" ?
                                    <img src="https://png.pngtree.com/png-clipart/20250115/original/pngtree-approved-stamp-with-tick-and-ribbon-look-vector-png-image_20183852.png" alt="approved" style={{ width: '60px', height: '60px' }} />
                                    :
                                    <img src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-circle-sold-red-stamp-with-texture-vector-png-image_19293935.png" alt="sold" style={{ width: '70px', height: '60px' }} />}
                                </div>

                            </div>
                            <div>
                                <img src={item?.imageurl} alt="" style={{ height: '300px', width: '200px' }} className='w-full' />
                                <div className='flex justify-end mt-4'>
                                    <button onClick={()=>deleteBook(item?._id)} className='p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600'>Delete</button>
                                </div>

                            </div>
                        </div>
                    </div>
                   ))
                   

                    :
                    // no books

                    <div className='flex justify-center items-center flex-col'>
                        <img src="https://assets-v2.lottiefiles.com/a/ba63632a-1176-11ee-9737-5f2bb626332f/S1wVGMQqbK.gif" alt="no books" style={{ width: '200px', height: '200px' }} />
                        <p className='text-red-600 text-2xl'>No Books Added Yet!!</p>
                    </div>}
                </div>
            }
            <ToastContainer position='top-center' autoClose={2000} />
            <Footer />
        </>
    )
}

export default Profile