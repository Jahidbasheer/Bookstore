import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import { getHomeBooksAPI } from '../../services/allAPIs'
import { searchKeyContext } from '../../context/Contextshare'
import { toast, ToastContainer } from 'react-toastify'
const Home = () => {

  const [homeBook,setHomeBook]=useState([])
  const {searchKey,setSearchKey}=useContext(searchKeyContext)
  const navigate = useNavigate()

  const getHomeBooks = async ()=>{
    const result=await getHomeBooksAPI()
    console.log(result.data);
    if(result.status==200){
      setHomeBook(result.data)
    }
    
  }

  const searchBook = ()=>{
    const token = sessionStorage.getItem("token")

    if(searchKey==""){
      toast.info("Please Enter Title !!!")
    }else if(!token){
      toast.info("Please Login!!!")
      setTimeout(()=>{
        navigate("/login")
      },2500)
    }else if(searchKey && token){
      navigate("/all-books")
    }else{
      toast.error("Something went wrong!!!")
    }
  }

  useEffect(()=>{
    getHomeBooks()
    setSearchKey("")
  },[])

  return (
    <>
    <Header/>
    <header className='flex justify-center items-center'>
      <div id='main' className='flex justify-center items-center'>
        <div className='md:grid grid-cols-3'>
          <div></div>
          <div className='text-white flex justify-center items-center flex-col'>
            <h1 className='text-5xl'>Wonderful Gifts</h1>
            <p>Give your family and friends a book</p>
            <div className='flex mt-10 w-full'>
              <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search Books' className='py-2 px-4 bg-white rounded-2xl placeholder-gray-500 w-full text-black' />
              <FontAwesomeIcon onClick={searchBook} icon={faMagnifyingGlass} className='text-blue-800' style={{marginTop:'11px' ,marginLeft:'-30px'}}/>
            </div>
          </div>
          <div></div>

        </div>
      </div>
    </header>

    {/* new Arrivals */}
    <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
      <h2>NEW ARRIVALS</h2>
      <h4>Explore Our Latest Collection</h4>

      <div className='md:grid grid-cols-4 w-full mt-5'>

        {homeBook?.length>0?
          homeBook?.map((item)=>(
             <div className='p-3'>
          <img src={item?.imageurl} 
          alt="no image" style={{width:'100%',height:'300px'}} />
          <div className='flex justify-center flex-col items-center mt-3'>
            <p>{item?.author}</p>
            <h3>{item?.title}</h3>
            <p>${item?.dprice}</p>
          </div>
        </div>
          ))
          :
          <p>Loading....</p>
         }
        
      </div>

      <div className='flex justify-center items-center my-5'>
        <Link to={'/all-books'}><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900 rounded'>Explore More</button></Link>
      </div>
    </section>

    {/* author */}
    <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
      <div className='md:grid grid-cols-2 w-full'>
        <div>
          <div className='flex justify-center items-center flex-col'>
              <h4>Featured Authors</h4>
              <h3 className='text-2xl'>Captivates with every word</h3>
          </div>
          <p className='mt-6 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente enim at repudiandae dolorem commodi tenetur aliquam labore laborum porro cumque a, dolor recusandae sunt sit ea sint iure minima dignissimos!</p>
          <p className='mt-6 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente enim at repudiandae dolorem commodi tenetur aliquam labore laborum porro cumque a, dolor recusandae sunt sit ea sint iure minima dignissimos!</p>
        </div>
        
        <div className='px-10 pt-8'>
          <img src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg" alt="" className='w-full'/>
        </div>
      </div>
    </section>

    {/* testimonials */}
    <div className='flex justify-center items-center flex-col md:py-10 md:px-40'>
      <h3>TESTIMONIALS</h3>
      <h4 className='text-2xl'>See What Others Are Saying</h4>

      <img src="https://image.cnbcfm.com/api/v1/image/108173451-1752770193821-IMG_8083.jpg?v=1752770230&w=800&h=600&ffmt=webp" alt="" style={{width:'150px' ,height:'150px',borderRadius:'50%'}} className='mt-5'/>
      <h6 className='mt-3'>ALEX</h6>
      <p className='mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio harum sapiente alias maxime rerum, eius quis veniam corrupti illum asperiores consequuntur dolor earum, nesciunt soluta magni laudantium officia cumque quibusdam!</p>
    </div>
    <ToastContainer position='top-center' autoClose={2000} />
    <Footer/>
    </>
  )
}

export default Home