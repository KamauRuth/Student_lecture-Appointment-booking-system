import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../redux/userSlice';
import { showLoading, hideLoading } from '../redux/alertSlice';

function ProtectedRoutes(props) {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser= async ()=> {
        try {
            dispatch (showLoading())
            const response = await axios.post('/api/user/get-user-info-by-id', {token : localStorage.getItem('token')},
            
        );
          if(response.data.success) {
            dispatch(hideLoading());
        } else{
            navigate('/login');
        }
        }
        catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if(!user) {
            getUser()
        }

        
    }, [user]);

    if (localStorage.getItem('token')) {
        return props.children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoutes;
