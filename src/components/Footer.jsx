import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faInbox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='grid grid-cols-3 bg-gray-900 w-full text-white p-10'>
        <div className='flex flex-col  '>
          <h3 className='text-lg'>ABOUT US</h3>
          <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae facere soluta vitae similique in, laboriosam aliquam consectetur mollitia amet nesciunt temporibus distinctio? Dolor reiciendis at vitae voluptates, in sapiente officia.</p>
        </div>
        <div className='flex flex-col justify-center mx-20'>
            <h3>NEWSLETTER</h3>
            <p className='mt-8'>Stay updated with our latest trends</p>
            <div className='flex mt-2'>
              <input type="text" placeholder='EMAIL ID' className='bg-white text-black  p-2'/>
              <button className='px-2 py-2 bg-amber-200 '><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
        <div className='flex flex-col mx-20 '>
            <h3>FOLLOW US</h3>
            <p className='mt-7'>Let us be social</p>
            <div>
              <FontAwesomeIcon icon={faInstagram} className='me-2'/>
              <FontAwesomeIcon icon={faXTwitter} className='me-2'/>
              <FontAwesomeIcon icon={faFacebook} className='me-2'/>
              <FontAwesomeIcon icon={faInbox} className='me-2'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer