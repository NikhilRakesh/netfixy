import React from 'react'
import { userAuth } from '../context/Authcontext'
import { Navigate } from 'react-router-dom'

const Protectedroute = ({ children }) => {

    const { user } = userAuth()

    if (!user) {
        return <Navigate to='/' />
    }

    return children
}

export default Protectedroute
