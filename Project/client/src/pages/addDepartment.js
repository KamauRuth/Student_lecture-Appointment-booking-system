import React from 'react'
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Layout from '../components/layout';
import { useState } from 'react';

const { Title } = Typography;



function AddDepartment() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        department: '',

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
            const response = await axios.post('/api/admin/add-department', form)

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
    };;

    return (
        <Layout>
            <div style={{ padding: '50px' }}>
                <Title level={2}>Add Department</Title>
                <Form layout="vertical" >
                    <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Please input the department!' }]}>
                        <Input name='department' onChange={handleChange} value={form.department} />
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={onFinish} type="primary" htmlType="submit">Add Department</Button>
                    </Form.Item>
                </Form>
            </div>
        </Layout>
    );
}


export default AddDepartment
