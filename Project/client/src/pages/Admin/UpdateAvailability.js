import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import  Layout  from '../../components/layout';
import { updateLocale } from 'moment';

const UpdateAvailability = ({ lecturerId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetchTimes();
  }, []);

  const fetchTimes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/lecturers/${lecturerId}`);
      setAvailableTimes(response.data.availableTimes);
      const appointments = await axios.get('http://localhost:5000/appointments');
      const bookedSlots = appointments.data
        .filter(appointment => appointment.lecturerName === lecturerId && appointment.status === 'Accepted')
        .map(appointment => new Date(appointment.timeSlot));
      setBookedTimes(bookedSlots);
    } catch (error) {
      console.error('Error fetching times:', error);
    }
  };

  const onChange = date => {
    setDate(date);
    const dateString = date.toISOString().split('T')[0];
    if (availableTimes.includes(dateString)) {
      setAvailableTimes(availableTimes.filter(time => time !== dateString));
    } else {
      setAvailableTimes([...availableTimes, dateString]);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/lecturers/${lecturerId}/available-times`, { availableTimes });
      alert('Available times updated successfully!');
    } catch (error) {
      console.error('Error updating available times:', error);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (bookedTimes.some(booked => booked.toISOString().split('T')[0] === dateString)) {
        return 'booked';
      }
      if (availableTimes.includes(dateString)) {
        return 'available';
      }
    }
    return null;
  };

  return (
    <Layout>
    <div>
      <h1>Update Available Times</h1>
      <Calendar
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
      />
      <button onClick={handleSave}>Save</button>
    </div>
    </Layout>
  );
};

export default UpdateAvailability;
