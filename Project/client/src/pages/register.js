import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  const [confirmpassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      if (form.password !== confirmpassword) {
        return toast.error('Passwords do not match');
      }
    
      const response = await axios.post('/api/user/register', form)
      const data = await response.data;
    
      if (data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
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
    <div className="authentication">
      <Toaster />
      <div className="authentication_form">
        
        <form className="myform" onSubmit={onFinish}>
        <h1>Register</h1>
          <div className="input-box">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={handleChange}
              value={form.firstname}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-box">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={handleChange}
              value={form.lastname}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={form.username}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="input-box">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="input-box">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
              required
              placeholder="Confirm your password"
            />
          </div>

          <div className="checkbox-box">
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              Remember me
            </label>
          </div>

          <button type="submit" className="btn">Register</button>

          <div className="register-link">
            <p>Already have an account? <a href="/login">Login</a></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
