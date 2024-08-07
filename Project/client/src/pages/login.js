import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login() {
  const {loading}= useSelector(state => state.alerts)
  console.log(loading)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
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
      const response = await axios.post('/api/user/login', form)
      const data = await response.data;
      if (data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token',  response.data.data);
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

    <div className='Login'>
      <div className='Login_form'>
        <h1>Login</h1>
        <form className="" onSubmit={onFinish}>
          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username"  onChange={handleChange}
              value={form.username} required placeholder="Enter your username" />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"  onChange={handleChange}
              value={form.password} required placeholder="Enter your password" />
          </div>

          
          <div className="checkbox-box">
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" onChange={handleChange}
              value={form.forgotpassword}  />
              Remember me<p><a href="/forgotpassword">Forgot Password?</a></p>
            </label>
          </div>
          
          <button type="submit" className="btn">Login</button>

          <div className="register-link">
            <p>Do not have an account? <a href="/register">Register</a></p>
          </div>

          <div className="lecturer-login">
            <p>Login as Lecturer <a href="/lecturer-login">Login</a></p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
