import { faCamera, faEye, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makePaymentAPI, viewABookAPI } from '../../services/allAPIs'
import { serverURL } from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js'
import { toast, ToastContainer } from 'react-toastify'

const Viewbook = () => {

    const [modalStatus,setModalStatus]=useState(false)
    const [viewBookDetails,setViewBookDetails]=useState({})
    const [token,setToken]=useState("")

    const {id}=useParams()

    const viewABook = async(id)=>{
        const result = await viewABookAPI(id)
        if(result.status==200){
            setViewBookDetails(result.data)
        }
    }
    console.log(viewBookDetails);

    const makePayment = async()=>{
        console.log(viewBookDetails);
        const stripe = await loadStripe('pk_test_51Sed8ER4ePs1JTxrU3muhbwAC5F3X3RkhzZeyLtAGPOuG3WhYoeEz1PCMD4qLykV5CgrCyRwcbM8ypuKPz6UZb2k00N91RDzKp');
        const reqBody ={
            bookDetails:viewBookDetails
        }
        const reqHeader = {
                "Authorization": `Bearer ${token}`
        }
        const result = await makePaymentAPI(reqBody,reqHeader)
        console.log(result);

        const checkoutURL = result?.data?.url

        if(checkoutURL){
            // redirect to page
            window.location.href = checkoutURL
        }else{
            toast.error("Something went wrong!!")
        }
        
    }

    useEffect(()=>{
        viewABook(id)
        if(sessionStorage.getItem('token')){
            const token=sessionStorage.getItem('token')
            setToken(token)
        }
    },[])
    

  return (
    <>
        <div className='flex justify-evenly items-center shadow-xl p-10 m-20'>
            <div>
                <img src={viewBookDetails?.imageurl} alt=""  style={{width:'200px',height:'300px'}}/>
            </div>
            <div>
                <div className='flex justify-end mb-5'>
                    <FontAwesomeIcon icon={faEye} onClick={()=>setModalStatus(true)}/>
                </div>
                <div className='mb-10 text-center'>
                    <h1 className='text-2xl'>{viewBookDetails?.title}</h1>
                    <h1 className='text-blue-400'>{viewBookDetails?.author}</h1>
                </div>

                <div className='grid grid-cols-3 gap-20'>
                    <div>
                        <h1>Publisher : {viewBookDetails?.publisher}</h1>
                        <h1>User : {viewBookDetails?.userMail}</h1>
                    </div>
                    <div>
                        <h1>Language : {viewBookDetails?.language}</h1>
                        <h1>Price : {viewBookDetails?.price}</h1>
                    </div>
                    <div>
                        <h1>Pages : {viewBookDetails?.noofpages}</h1>
                        <h1>ISBN : {viewBookDetails?.isbn}</h1>
                    </div>
                </div>
                <div className='w-100'>
                    <h1 className='mt-10'>Abstract :  {viewBookDetails?.Abstract}</h1>
                </div>

                <div className='flex justify-end mt-15'>
                <Link to={'/all-books'}><button className='p-2 bg-gray-950 text-white rounded mx-3'>Back</button></Link>
                <button onClick={makePayment} className='p-2 bg-green-600 text-white rounded'>Buy ${viewBookDetails?.dprice}</button>
                </div>
            </div>
            
        </div>
        {modalStatus&&(
            <div className='flex inset-0 fixed justify-center items-center bg-black/50'>
            <div className='w-200 bg-white '>
                <div className='bg-gray-950 flex justify-between'>
                    <h1 className=' p-3 text-white'>Book photos</h1>
                    <FontAwesomeIcon icon={faX} style={{color:'white'}} className='text-xl p-2' onClick={()=>setModalStatus(false)}/>
                </div>
               
               <div className='p-10'>
                    <h1 className='mb-8 text-blue-500'><FontAwesomeIcon icon={faCamera} /> Camera click of the book in the hand of seller</h1>
                    <div className='flex justify-evenly'>
                      {viewBookDetails?.uploadImg.map((item)=>(
                        <img src={`${serverURL}/upload/${item}`} alt="" style={{width:'200px',height:'300px'}}/>
                      ))}
                    </div>
               </div>
            </div>
        </div>)}
        <ToastContainer position='top-center' autoClose={2000} />
    </>
  )
}

export default Viewbook