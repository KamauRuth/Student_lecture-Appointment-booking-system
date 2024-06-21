import  Layout from '../components/layout';
import React from 'react'
import { Form, Input, Button, DatePicker, TimePicker, Typography, Row, Col } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

function Appointments() {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('Appointment booked:', { ...values, date, time });
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };
  return (
    <Layout>
        <div style={{ padding: '50px' }}>
      <Title level={2}>Book an Appointment</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
          <DatePicker style={{ width: '100%' }} onChange={(date) => setDate(date)} />
        </Form.Item>
        <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time!' }]}>
          <TimePicker style={{ width: '100%' }} onChange={(time) => setTime(time)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        </Form.Item>
        <Form.Item label="Reason for Booking" name="reason" rules={[{ required: true, message: 'Please provide a reason!' }]}>
          <TextArea value={reason} onChange={(e) => setReason(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Book Appointment</Button>
        </Form.Item>
      </Form>
    </div>

    </Layout>
   
  )
}

export default Appointments;
