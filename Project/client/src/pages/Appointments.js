import Layout from '../components/layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function Appointments() {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState('');
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
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDepartments();
    getUserInfo(token);
  }, []);

  // Get user info
  const getUserInfo = async (token) => {
    try {
      const response = await axios.post('/api/user/get-user-info-by-id', { token });
      const { username, email } = response.data.user;
      setName(username);
      setEmail(email);
      setUserId(response.data.user._id);
      form.setFieldsValue({ name: username, email: email }); // Set form field values
    } catch (error) {
      toast.error('Error fetching user info: ' + error.message);
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/user/get-all-department');
      setDepartments(response.data);
    } catch (error) {
      toast.error('Error fetching departments: ' + error.message);
    }
  };

  // Fetch lecturers
  const fetchLecturers = async (department) => {
    try {
      const response = await axios.get('/api/user/get-lecturer-by-department', { params: { department: department } });
      setLecturers(response.data);
    } catch (error) {
      toast.error('Error fetching lecturers: ' + error.message);
    }
  };

  // Handle department change
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    fetchLecturers(value); // Fetch lecturers when department changes
    setSelectedLecturer(''); // Reset selected lecturer
    setAvailableDates([]); // Reset available dates
    setAvailableTimes([]); // Reset available times
  };

  // Handle lecturer change
  const handleLecturerChange = (value) => {
    setSelectedLecturer(value);
    const lecturer = lecturers.find((l) => l._id === value);

    if (lecturer && lecturer.newAvailability && lecturer.newAvailability.length > 0) {
      const availability = lecturer.newAvailability[0];
      const days = availability.availableDays || [];
      const times = availability.availableTimes || [];

      // Convert availableDays to date strings if days are not empty
      setAvailableDates(days.map(day => moment(day).format('YYYY-MM-DD')));
      setAvailableTimes(times);
    } else {
      setAvailableDates([]);
      setAvailableTimes([]);
    }
  };

  // Submit form
  const onFinish = async (values) => {
    try {
      const { name, email, reason } = values;
      const response = await axios.post('/api/user/book-appointment', {
        ...values,
        lecturerId: selectedLecturer,
        userId: userId,
        date: date ? date.format('YYYY-MM-DD') : '',
        time: time ? time : '',
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
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ name, email }}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input value={name} readOnly disabled />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input value={email} readOnly disabled />
          </Form.Item>
          <Form.Item label="Select Department" name="department" rules={[{ required: true, message: 'Please select a Department!' }]}>
            <Select onChange={handleDepartmentChange}>
              {departments.map((department) => (
                <Option key={department._id} value={department.department}>
                  {department.department}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Lecturer" name="lecturer" rules={[{ required: true, message: 'Please select a lecturer!' }]}>
            <Select
              onChange={handleLecturerChange}
              placeholder="Select a lecturer"
              disabled={!selectedDepartment || lecturers.length === 0}
              value={selectedLecturer}
            >
              {lecturers.map((lecturer) => (
                <Option key={lecturer._id} value={lecturer._id}>
                  {lecturer.username}
                </Option>
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
            <Select
              placeholder="Select a time"
              onChange={(time) => setTime(time)}
              disabled={!selectedLecturer || availableTimes.length === 0}
            >
              {availableTimes.map((time, index) => (
                <Option key={index} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
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
