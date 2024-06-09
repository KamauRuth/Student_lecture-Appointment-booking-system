import React from 'react'
import { Navigate } from 'react-router-dom'

function publicRoute(props) {
    if(localStorage.getItem('token')){
        return <Navigate to="/" />
    } else {
        return props.children
    }

}

export default publicRoute
