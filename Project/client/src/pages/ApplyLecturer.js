import React from 'react'
import Layout from '../components/layout'

function ApplyLecturer() {
  return (
    <div>
    <h1 className='page-title'>Apply Lecturer</h1>
     <Layout>
       

       <form>
          <div className="input-box">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
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
              required
              placeholder="Enter your last name"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              required
              placeholder="Enter your department"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              required
              placeholder="Enter your qualification"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              required
              placeholder="Enter your experience"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              placeholder="Confirm your password"
            />
          </div>
  
          <button type="submit" className="btn">Apply</button>
       </form>


      </Layout>
    </div>
 )
};


export default ApplyLecturer;
