import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';



function Register() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  const onFinish = async (e) => {
     e.preventDefault();
     console.log("hello");
    try {
      console.log("hello")
      const response = await axios.post('https://student-lecture-appointment-booking.onrender.com/api/user/register', form);
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };


  return (
    <div className="authentication">
      <div className="authentication_form">
        <h1>Register</h1>
        <div className='myform' >
          <div className="input-box">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" onChange={handleChange}value={form.firstname} required placeholder="Enter your first name" />
          </div>

          <div className="input-box">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname"  onChange = {handleChange} 
            value={form.lastname}required placeholder="Enter your last name" />
          </div>

          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} value={form.username} required placeholder="Enter your username" />
          </div>

          <div className="input-box">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} value={form.email} required placeholder="Enter your email" />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={form.password} required placeholder="Enter your password" />
          </div>

          <div className="input-box">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirmPassword" onChange={handleChange} value={form.confirmPassword} required placeholder="Confirm your password" />
          </div>

          <div className="checkbox-box">
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              Remember me
            </label>
          </div>
        </div>
        <button onClick={onFinish} className="btn">Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="/login">Login</a></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
      </div>
    </div>
  );
}

export default Register;
