import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Layout from '../../components/layout';
import { Form, Select, TimePicker, Button,} from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//import { updateLocale } from 'moment';

const { Option } = Select;

const UpdateAvailability = ({ lecturerId }) => {
  // const [form] = Form.useForm();
  
  // const [availableDays, setAvailableDays] = useState([]);
  // const [availableTimes, setAvailableTimes] = useState([]);

  // useEffect(() => {
  //     // Fetch current availability if needed
  //     axios.post('/api/lecturer/get-availability', { lecturerId })
  //         .then(response => {
  //             const { availableDays, availableTimes } = response.data;
  //             setAvailableDays(availableDays);
  //             setAvailableTimes(availableTimes);
  //             form.setFieldsValue({ availableDays, availableTimes });
  //         })
  //         .catch(error => {
  //             toast.error('Error fetching current availability: ' + error.message);
  //         });
  // }, [lecturerId, form]);


  const navigate = useNavigate();
  const [form, setForm] = useState({
    availableDays: [],
    availableTimes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleSubmit = (values) => {
      axios.post('/api/lecturer/update-availability', { lecturerId, ...values })
          .then(response => {
            console.log(response.data);
              toast.success('Availability updated successfully!');
          })
          .catch(error => {
              toast.error('Error updating availability: ' + error.message);
          });
  };


  return (
    <Layout>
      <Form layout="vertical">
        <Form.Item label="Available Days" >
          <Select
            mode="multiple"
            placeholder="Select available days" name= "availableDays"
            onChange={() => handleChange() } value={form.availableDays}
          >
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
            <Option value="Sunday">Sunday</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Available Times" >
          <TimePicker.RangePicker name= "availableTimes"
            format="HH:mm"
            onChange={() => handleChange()} value={form.availableTimes.map(time => new Date(time))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>Update Availability</Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default UpdateAvailability;
