import React from 'react';

function Login() {
  return (
    <div className='Login'>
      <div className='Login_form'>
        <h1>Login</h1>
        <form>
          <div className="input-box">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="Enter your username" />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter your password" />
          </div>

          
          <div className="checkbox-box">
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              Remember me<p><a href="/forgotpassword">Forgot Password?</a></p>
            </label>
          </div>
          
          <button type="submit" className="btn">Login</button>

          <div className="register-link">
            <p>Do not have an account? <a href="/register">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
