import React from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

const Career = () => {
  return (
    <>
        <Header/>
        <div>
            <div className='flex justify-center items-center flex-col mt-10'>
                <h1 className='text-2xl'>Careers</h1>
                <p className='px-60 pt-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat provident atque esse repudiandae maiores adipisci inventore, consectetur architecto nihil! Amet minima porro tempora fugit perferendis velit molestias animi minus voluptatem.</p>
            </div>
            <div className='mt-15'>
                <p className='ps-20'>Current Openings</p>
               <div className='text-center'>
                 <input type="text"  placeholder='Job Title' className='p-2 border border-gray-400 w-100 mt-3 '/><button className='bg-green-600 p-2 text-white'>Search</button>
                </div>
            </div>
            <div className='mx-30 border shadow-2xl border-gray-300 mt-10 mb-5'>
                <div className='flex justify-between items-center p-1 pr-3 pt-2'>
                    <span className='text-lg ps-3 '>Job Title</span>
                    <button className='px-2 py-2 bg-blue-700 text-white rounded '>Apply  <FontAwesomeIcon icon={faSquareArrowUpRight} />
                    </button>
                </div>
                <div className="border-b-2 border-gray-400 w-250 my-1 ms-3"></div>
                <div className='mt-2 p-4'>
                    <p><FontAwesomeIcon icon={faLocationDot} style={{color: "#74C0FC",}} /> Location</p>
                    <p className='mt-2'>Job Type : Senior Level</p>
                    <p className='mt-2'>Salary : 10 lakhs</p>
                    <p className='mt-2'>Qualification : M-tech/BCA/MCA</p>
                    <p className='mt-2'>Experience : 5-7</p>
                    <p className='mt-2'>Description : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad iure laudantium voluptate cupiditate itaque? Eveniet eum facilis, minima explicabo voluptas ea voluptatum ut omnis qui inventore? Ea architecto nobis consequuntur!</p>
                </div>
                
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Career