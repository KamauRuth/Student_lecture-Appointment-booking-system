import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Layout from '../../components/layout';
import { Form, Select, TimePicker, Button,} from 'antd';
import toast from 'react-hot-toast';
//import { updateLocale } from 'moment';

const { Option } = Select;

const UpdateAvailability = ({ lecturerId }) => {
  const [form] = Form.useForm();
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
      // Fetch current availability if needed
      axios.post('/api/lecturer/get-availability', { lecturerId })
          .then(response => {
              const { availableDays, availableTimes } = response.data;
              setAvailableDays(availableDays);
              setAvailableTimes(availableTimes);
              form.setFieldsValue({ availableDays, availableTimes });
          })
          .catch(error => {
              toast.error('Error fetching current availability: ' + error.message);
          });
  }, [lecturerId, form]);

  const handleSubmit = (values) => {
      axios.post('/api/lecturer/update-availability', { lecturerId, ...values })
          .then(response => {
              toast.success('Availability updated successfully!');
          })
          .catch(error => {
              toast.error('Error updating availability: ' + error.message);
          });
  };


  return (
    <Layout>
      <Form layout="vertical">
        <Form.Item label="Available Days">
          <Select
            mode="multiple"
            placeholder="Select available days"
            onChange={(value) => setAvailableDays(value)}
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
        <Form.Item label="Available Times">
          <TimePicker.RangePicker
            format="HH:mm"
            onChange={(value) => setAvailableTimes(value.map(time => time.format('HH:mm')))}
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
