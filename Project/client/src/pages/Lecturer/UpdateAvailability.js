import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';
import { Select, Button } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const { Option } = Select;

// const UpdateAvailability = () => {
//   const initialRange = {
//     from: new Date(),
//     to: new Date(),
//   };

const UpdateAvailability = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  const handleDateChange = (field, date) => {
    setDateRange({
      ...dateRange,
      [field]: date,
    });
  };

  const generateDateArray = (from, to) => {
    const dates = [];
    let currentDate = new Date(from);

    while (currentDate <= new Date(to)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  // Remove the duplicate declaration of handleSubmit
    const { from, to } = dateRange;
    const datesArray = generateDateArray(from, to);
    console.log(datesArray); // This will log the array of dates
    const navigate = useNavigate();
  const [lecturerId, setLecturerId] = useState(null);
  const [range, setRange] = useState();
  const [form, setForm] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData && storedData.userId) {
      setLecturerId(storedData.userId);
      console.log("Retrieved lecturerId from localStorage:", storedData.userId);
    } else {
      toast.error('User not found in local storage');
    }
  }, []);

  const handleSelectChange = (value) => {
    setAvailableTimes(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAvailability = {
      availableDays: [range.from, range.to],
      availableTimes,
    };

    setForm([...form, newAvailability]);
    console.log('Form before submission:', [...form, newAvailability]);

    axios.post('/api/lecturer/update-availability', { _id: lecturerId, newAvailability: [...form, newAvailability] })
      .then(response => {
        console.log(response.data);
        toast.success('Availability updated successfully!');
        navigate('/update-availability');
      })
      .catch(error => {
        toast.error('Error updating availability: ' + error.message);
      });
  };

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
              mode="multiple"
              name="time"
              id="time"
              required
              onChange={handleSelectChange}
              className="time"
              style={{ width: '70%' }}
              placeholder="Select one or more time intervals"
            >
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

 