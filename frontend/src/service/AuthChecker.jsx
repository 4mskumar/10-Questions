import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthChecker = ({children}) => {
  
    const {isLoading, isAuthenticated} = useAuth0()
    if(isLoading) return <div>Loading...</div>
    if(!isAuthenticated) return <Navigate to="/" />
    
    return (
        <div>
            {children}
        </div>
  )
}

export default AuthChecker