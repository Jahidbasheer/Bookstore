import { Route, Routes } from 'react-router-dom'
import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Career from './users/components/Career'
import Contacts from './users/components/Contacts'
import AllBooks from './users/pages/AllBooks'
import Profile from './users/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminBooks from './admin/pages/AdminBooks'
import AdminSettings from './admin/pages/AdminSettings'
import Viewbook from './users/pages/Viewbook'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'

function App(){

  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(true)
    },4000)
  },[])

return (
  <>
    
    <Routes>
      <Route path='/' element={loading?<Home />:<Preloader/>} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='*' element={<PageNotFound />} />
      {/* <Route path='/career' element={<Career/>}/> */}
      <Route path='/contact' element={<Contacts/>}/>
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/view-books/:id' element={<Viewbook/>}/>
      <Route path='/payment-success' element={<PaymentSuccess/>}/>
      <Route path='/payment-error' element={<PaymentError/>}/>

      <Route path='/admin-home' element={loading?<AdminHome />:<Preloader/>}/>
      <Route path='/admin-books' element={<AdminBooks/>}/>
      <Route path='/admin-settings' element={<AdminSettings/>}/>

    </Routes>
    
  </>
)
}

export default App
