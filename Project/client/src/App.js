import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword';  
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>

      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />

      
      </Routes>

    </BrowserRouter>
  )
}
export default App;
