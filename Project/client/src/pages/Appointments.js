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
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
const navigate = useNavigate();
  
  const [department, setDepartment] = useState([]);


    useEffect(() => {
      fetchDepartments();
      fetchLecturers();
    }, []);

      // Fetch departments
      const fetchDepartments = async () =>{
        try{
         const response= await axios.get('/api/user/get-all-department')
          setDepartment(response.data);
        
      }catch(error) {
          toast.error('Error fetching departments: ' + error.message);
        };
      }
  
      // Fetch lecturers
      const fetchLecturers = async ()=> {
        try{
          await axios.post('/api/user/get-lecturer-by-department')
          .then(response => {
          setLecturers(response.data);
        })
      }catch(error)  {
          toast.error('Error fetching lecturers: ' + error.message);
        };
      }
  
    useEffect(() => {
   
      // Filter lecturers based on selected department
    
      if (selectedDepartment) {
        const filtered = lecturers.filter(lecturer => lecturer.departmentId === selectedDepartment);
        setFilteredLecturers(filtered);
      } else {
        setFilteredLecturers([]);
      }
    }, [selectedDepartment, lecturers]);
  
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
  
    // const handleSubmit = () => {
    //   form.validateFields().then(values => {
    //     console.log('Appointment booked:', { ...values, date, time });
    //   }).catch(info => {
    //     console.log('Validate Failed:', info);
    //   });
    // };
    const onFinish = async (e) => {
      e.preventDefault();
      try {
      
        const response = await axios.post('/api/user/book-appointment', form)
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
        <Title level={2}>Book an Appointment</Title>
        <Form form={form} layout="vertical" onSubmit={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Select Department" name="department" rules={[{ required: true, message: 'Please select a Department!' }]}>
            <Select onChange={(value) => setSelectedDepartment(value)}>
              {department?.map(department => (
                <Option key={department._id} value = {department._id}>{department.department}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Select Lecturer" name="lecturer" rules={[{ required: true, message: 'Please select a lecturer!' }]}>
            <Select onChange={(value) => setSelectedLecturer(value)}>
              {filteredLecturers.map(lecturer => (
                <Option key={lecturer.id} value={lecturer.id}>{lecturer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Day" name="day" rules={[{ required: true, message: 'Please select a date!' }]}>
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
              defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
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
