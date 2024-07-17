import Layout from '../components/layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Typography, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


  

function Appointments() {
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [reason, setReason] = useState('');
  const [lecturers, setLecturers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/user/get-all-department');
      setDepartments(response.data);
    } catch (error) {
      toast.error('Error fetching departments: ' + error.message);
    }
  }

  // Fetch lecturers
  const fetchLecturers = async (departmentId) => {
    try {
      const response = await axios.get('/api/user/get-lecturer-by-department', { params: { department: departmentId } });
      setLecturers(response.data);
    } catch (error) {
      toast.error('Error fetching lecturers: ' + error.message);
    }
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    fetchLecturers(value); // Fetch lecturers when department changes
  };

  useEffect(() => {
    // Set available dates and times based on selected lecturer
    if (selectedLecturer) {
      const lecturer = lecturers.find(l => l._id === selectedLecturer);
      setAvailableDates(lecturer ? lecturer.availableDates : []);
      setAvailableTimes(lecturer ? lecturer.availableTimes : []);
    } else {
      setAvailableDates([]);
      setAvailableTimes([]);
    }
  }, [selectedLecturer, lecturers]);

  const onFinish = async (values) => {
    try {
     
      const {  username, email, reason } = values;
      const response = await axios.post('/api/user/book-appointment', {
        ...values,
        lecturerId: selectedLecturer,
        userInfo: {username,  email},
        date: date.format('YYYY-MM-DD'),
        time: time.format('HH:mm') ,
        reason,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };

  return (
    <Layout>
      <div style={{ padding: '50px' }}>
        <Title level={2}>Book an Appointment</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Select Department" name="department" rules={[{ required: true, message: 'Please select a Department!' }]}>
            <Select onChange={handleDepartmentChange}>
              {departments.map(department => (
                <Option key={department._id} value={department._id}>{department.department}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Lecturer" name="lecturer" rules={[{ required: true, message: 'Please select a lecturer!' }]}>
            <Select onChange={(value) => setSelectedLecturer(value)} placeholder="Select a lecturer" disabled={!selectedDepartment}>
              {lecturers.map(lecturer => (
                <Option key={lecturer._id} value={lecturer._id}>{lecturer.username}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date!' }]}>
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) => !availableDates.includes(current.format('YYYY-MM-DD'))}
              onChange={(date) => setDate(date)}
            />
          </Form.Item>
          <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Please select a time!' }]}>
            <TimePicker
              style={{ width: '100%' }}
              disabledTime={() => {
                const availableHours = availableTimes.map(time => moment(time, 'HH:mm').hour());
                return [...Array(24).keys()].filter(hour => !availableHours.includes(hour));
              }}
              onChange={(time) => setTime(time)}
              defaultOpenValue={moment('00:00', 'HH:mm')}
            />
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
  );
}
export default Appointments;
