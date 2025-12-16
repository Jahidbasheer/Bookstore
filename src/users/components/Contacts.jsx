import React from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

const Contacts = () => {
  return (
    <>
    <Header/>
    <div className='mb-20'>
        <div className='flex justify-center items-center flex-col mt-10'>
            <h1 className='text-2xl'>Contact</h1>
            <p className='px-40 pt-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat provident atque esse repudiandae maiores adipisci inventore, consectetur architecto nihil! Amet minima porro tempora fugit perferendis velit molestias animi minus voluptatem.</p>
        </div>
        <div className='grid grid-cols-3 text-center px-10 mt-10 mx-10'>
            <div className='flex justify-center items-center w-60'>
                <FontAwesomeIcon icon={faLocationDot} className='bg-gray-500 p-2 rounded-full w-fit'/>
                <p>123 Main Street ,Apt 48, branytown CA 9123</p>

            </div>
            <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faPhone} className='bg-gray-500 p-2 rounded-full w-fit'/>
                <p>+91 9567890321</p>
            </div>
            <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faEnvelope} className='bg-gray-500 p-2 rounded-full w-fit'/>
                <p>bookstall@gmail.com</p>
            </div>
        </div>
        <div className='flex justify-between items-center mt-10 px-40'>
            <div className='bg-gray-300 text-center p-5'>
                <h3 className='font-bold py-3'>Send me Message</h3>
                <input type="text" placeholder='Name' className='p-1 bg-white rounded mt-4 w-100'/><br />
                <input type="text" placeholder='Email ID' className='p-1 bg-white rounded mt-2 w-100'/><br />
                <textarea name="" id="" rows={3} placeholder='message' className='p-1 bg-white rounded mt-2 w-100'/><br />
                <button className='bg-gray-900 text-white p-1 rounded w-100 mt-3'>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
            <div className='flex justify-center items-center'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720282!2d76.30948102692354!3d10.008813464715116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1762330230533!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default Contacts