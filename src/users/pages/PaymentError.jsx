import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const PaymentError = () => {
    return (
        <>
            <Header />
            <div>
                <div className='grid grid-cols-2 mt-5 mb-30 '>
                    <div className='m-20'>
                        <h1 className='text-3xl mb-3 text-blue-800'>Sorry ! Your Payment Unsuccessful...</h1>
                        <h1>We apologize for the inconvinience caused......</h1>
                        <Link to={'/all-books'}><button className='mt-5 p-2 bg-blue-800 text-white rounded'><FontAwesomeIcon icon={faBackward} /> Explore More Books</button></Link>
                    </div>
                    <div className='m-10'>
                        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="" style={{ width: '500px', height: '300px' }} className='rounded' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError