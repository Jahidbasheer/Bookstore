import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <>
        <Header/>
        <div>
            <div className='grid grid-cols-2 mt-5 mb-30 '>
                <div className='m-20'>
                    <h1 className='text-3xl mb-3 text-blue-800'>Congratulation...</h1>
                    <h1>Thank you for shopping with Bookstore......</h1>
                    <Link to={'/all-books'}><button className='mt-5 p-2 bg-blue-800 text-white rounded'><FontAwesomeIcon icon={faBackward} /> Explore More Books</button></Link>
                </div>
                <div className='m-10'>
                    <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt=""  style={{width:'400px',height:'300px'}} className='rounded'/>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default PaymentSuccess