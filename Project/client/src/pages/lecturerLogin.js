/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function LecturerLogin() {
    const { loading } = useSelector(state => state.alerts)
    console.log(loading)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const [lecform, setLecForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLecForm({
            ...lecform,
            [name]: value,
        });
    };

    const onFinish = async (e) => {
        e.preventDefault();
        console.log(lecform);
        try {

            const response = await axios.post('/api/admin/lecturer-login', lecform)
            const data = await response.data;

            if (data.success) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error is:", error.message)
            toast.error('An error occurred');
        }
    };


    return (
        <div className='Leclogin'>
            <div className='Lec_form'>
                <form className="Lec-login" onSubmit={onFinish}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleChange}
                            value={lecform.username} required placeholder="Enter your username" />
                    </div>

                    <div className="input-box">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange}
                            value={lecform.password} required placeholder="Enter your password" />
                    </div>


                    <button type="submit" className="btn">Login</button>

                </form>
            </div>
        </div>
    )
}

export default LecturerLogin;
