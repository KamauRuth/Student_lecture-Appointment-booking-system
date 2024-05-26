import React from "react";

function ForgotPassword() {
  return (
    <div className="forgotpassword">
      <div className="forgotpassword_form">
        <h1>Forgot Password</h1>
        <form>
          <div className="input-box">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email address" />
          </div>
          <button type="submit" className="btn">Send Reset Link</button>
        
        <div className="login-link">
          <p>Remembered your password? <a href="/login">Login</a></p>
        </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
