import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/layout';

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('api/admin/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`api/admin/appointments/${id}/accept`);
      fetchAppointments();
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/appointments/${id}/reject`);
      fetchAppointments();
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  return (
    <Layout>
    <div>
      <h1>Booked Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <p>
                <strong>Student Name:</strong> {appointment.studentName} <br />
                <strong>Lecturer Name:</strong> {appointment.lecturerName} <br />
                <strong>Time Slot:</strong> {appointment.timeSlot} <br />
                <strong>Status:</strong> {appointment.status}
              </p>
              {appointment.status === 'Pending' && (
                <div>
                  <button onClick={() => handleAccept(appointment._id)}>Accept</button>
                  <button onClick={() => handleReject(appointment._id)}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default BookedAppointments;
