import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Layout from '../../components/layout';
import { Form, Select,  Button,} from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
;

//import { updateLocale } from 'moment';
const { Option } = Select;

const UpdateAvailability = ({ lecturerId }) => {
  const initialRange = {
    from: new Date(),
    to: new Date(),
  };

  const [range, setRange] = useState(initialRange);
  const [formInputs, setFormInputs] = useState({
    start: "",
    end: "",
    time: "",
  });
  const [form, setForm] = useState({
    availableDays: [],
    availableTimes: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSelectChange = (value) => {
    setForm({ ...form, availableTimes: value });
  };

  const handleSubmit = () => {
    const availableDays = [range.from, range.to]; // Assuming range is an object with 'from' and 'to' dates
    axios.post('/api/lecturer/update-availability', { lecturerId, availableDays, availableTimes: form.availableTimes })
      .then(response => {
        console.log(response.data);
        toast.success('Availability updated successfully!');
      })
      .catch(error => {
        toast.error('Error updating availability: ' + error.message);
      });
  };

  const hourRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Layout style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#fff' }}>
      <Form layout="vertical" onFinish={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Item label="Available Days">
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', padding: '12px' }}>
            <DayPicker
              mode="range"
              defaultMonth={new Date()}
              selected={range}
              onSelect={setRange}
              className="ant-picker"
              style={{ width: '100%' }}
            />
          </div>
        </Form.Item>

        <Form.Item label="Available Times">
          <Select
            name="time"
            id="time"
            required
            onChange={handleSelectChange}
            className="time"
            style={{ width: '100%' }}
          >
            <Option value="">Select an interval</Option>
            {hourRange.map((hour, i) => (
              <Option key={i} value={hour}>
                Every {hour} hour{hour !== 1 ? 's' : ''}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Update Availability</Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
export default UpdateAvailability;
