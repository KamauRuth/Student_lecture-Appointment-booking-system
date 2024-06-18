import React from 'react'
import Layout from '../components/layout'
import {  Row, Col, TimePicker } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';





function ApplyLecturer() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    courses: [],
    experience: '',
    timings: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };




  const onFinish = async (e)=> {
    e.preventDefault();
    try {
      
      const response = await axios.post('/api/user/apply-lecturer', form)
      const data = await response.data;
    
      if (data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/appointments');
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
   
     <Layout>
      <div className='form-container'>
        
        <form className="myform" onSubmit={onFinish}>
        <h1> personal Information</h1>
        <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        
          <div className="personal-info">
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
          </Col>
       
          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="personal-info">
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
          </Col>
          
          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="personal-info">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={form.lastname}
              required
              placeholder="Enter your last name"
            />
          </div>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="personal-info">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              required
              placeholder="Enter your email"
            />
          </div>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="personal-info">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="string"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              value={form.phoneNumber}
              required
              placeholder="Enter your phoneNumber"
            />
          </div>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="personal-info">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              value={form.address}
              required
              placeholder="Enter your address"
            />
          </div>
          </Col>
          </Row>

          <hr />
          <h1>Professional Information</h1>
          <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="professional-info">
            <label htmlFor="courses">courses</label>
            <input
              type="array"
              id="courses"
              name="courses"
              onChange={handleChange}
              value={form.courses}
              required
              placeholder="Enter your courses"
            />
          </div>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="professional-info">
            <label htmlFor="experience">Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              onChange={handleChange}
              value={form.experience}
              required
              placeholder="Enter your experience"
            />
          </div>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
          <div className="professional-info">
          <label htmlFor="Time">Time</label>
            <TimePicker.RangePicker/>  
            
          </div>
          </Col>
          </Row>

          <button type="submit" className="btn">Submit</button>


        </form>
      </div>
      
      </Layout>
   
 )

};




export default ApplyLecturer;
