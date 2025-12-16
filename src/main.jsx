import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <GoogleOAuthProvider clientId='1057774051100-78tli0hq9m1rpse7reg3enqfc65a60jc.apps.googleusercontent.com'>
      <Contextshare>
        <App />
      </Contextshare>
     </GoogleOAuthProvider>
   
    </BrowserRouter>
  </StrictMode>,
)
