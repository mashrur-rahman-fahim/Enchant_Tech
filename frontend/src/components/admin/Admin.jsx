import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Authentication/AuthContext';

export const Admin = () => {
    const navigate=useNavigate();
    const {setIsLoggedIn}=useAuth();
  return (
    <div>
        <button onClick={()=>{
             setIsLoggedIn(false)
            navigate('/login')
           

        }}>logout</button>
        Admin</div>
    
  )
}
