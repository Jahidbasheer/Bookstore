import React from 'react'

const Preloader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col p-5 md:p-0'>
          <img height={'200px'} width={'200px'} src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyMzc3ejR1b3doemVpY3JzOWE0Z2h1aHB1eDcycXdnM3MwNnNheGw3ZCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/VfK8uwEgsWawGtsSKO/giphy.gif" alt="Pzge Not Found" />
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader