import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';
import { Select, Button } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const { Option } = Select;

const UpdateAvailability = ({ lecturerId }) => {
  const initialRange = {
    from: new Date(),
    to: new Date(),
  };
  
  const navigate = useNavigate();
  const [range, setRange] = useState(initialRange);
  const [form, setForm] = useState([]);
  const [availableTimes, setAvailableTimes] = useState("");

  const handleSelectChange = (value) => {
    setAvailableTimes(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newAvailability = {
      availableDays: [range.from, range.to],
      availableTimes,
    };

    setForm([...form, newAvailability]);
    console.log('Form:', form);
    axios.post('/api/lecturer/update-availability', { _id: lecturerId, availabilities: [...form, newAvailability] })
      .then(response => {
        console.log(response.data);
        toast.success('Availability updated successfully!');
        navigate('/update-availability'); // Redirect to another page if needed
      })
      .catch(error => {
        toast.error('Error updating availability: ' + error.message);
      });
  };
  
  // Generate time intervals for 1-hour slots
  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      const start = `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'}`;
      const end = `${(hour + 1) % 12 || 12}${hour + 1 < 12 ? 'am' : 'pm'}`;
      intervals.push(`${start} - ${end}`);
    }
    return intervals;
  };

  const timeIntervals = generateTimeIntervals();

  return (
    <Layout>
      <div className='availability-form'>
        <h1>Update Availability</h1>
        <form className='Available Days' onSubmit={handleSubmit}>
          <div className='daypicker'>
            <label htmlFor='availableDays'>Available Days</label>
            <DayPicker
              mode="range"
              defaultMonth={new Date()}
              selected={range}
              onSelect={setRange}
              className="ant-picker"
            />
          </div>

          <div className='timepicker'>
            <label htmlFor='time'>Available Times</label>
            <Select
              name="time"
              id="time"
              required
              onChange={handleSelectChange}
              className="time"
              style={{ width: '70%' }}
            >
              <Option value="">Select an interval</Option>
              {timeIntervals.map((interval, i) => (
                <Option key={i} value={interval}>
                  {interval}
                </Option>
              ))}
            </Select>
          </div>

          <Button type="primary" htmlType="submit" style={{ width: '50%' }}>Update Availability</Button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateAvailability;
