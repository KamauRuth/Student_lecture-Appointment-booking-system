import React from 'react';

function Register() {
  return (
    <div className="authentication">
      <div className="authentication_form">
        <h1>Register</h1>
        <form>
          <div className="input-box">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" required placeholder="Enter your first name" />
          </div>

          <div className="input-box">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" required placeholder="Enter your last name" />
          </div>

          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="School Email" />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password" />
          </div>

          <div className="input-box">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required placeholder="Confirm your password" />
          </div>

          <button type="submit" className="btn">Register</button>
        
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
