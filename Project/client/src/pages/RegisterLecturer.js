import React, { useState } from 'react';
import { Form, Input, Button,  Typography } from 'antd';
import Layout from '../components/layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const { Title } = Typography;



function RegisterLecturer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
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
    console.log(form);

    try {
      
      const response = await axios.post('/api/admin/register-lecturers', form)

      console.log(response);
      const data = await response.data;
    
      if (data.success) {
        toast.success(response.data.message);
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
    <Layout>
      <div style={{ padding: '50px' }}>
        <Title level={2}>Register Lecturer</Title>
        <Form  layout="vertical"  >
          <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: 'Please input the lecturer\'s name!' }]}>
            <Input name='firstname'  onChange={handleChange} value={form.firstname} />
          </Form.Item>
          <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: 'Please input the lecturer\'s name!' }]}>
            <Input name='lastname'  onChange={handleChange} value={form.lastname} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the lecturer\'s email!', type: 'email' }]}>
            <Input name='email' value={form.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please select a department!' }]}>
            <Input name='department' value={form.department} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input a password!' }]}>
            <Input.Password name='password' value={form.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button onClick={onFinish}  type="primary" htmlType="submit">Register Lecturer</Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default RegisterLecturer;
