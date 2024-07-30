import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Button } from 'antd';
import Layout from '../../components/layout';

const { TabPane } = Tabs;

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      const response = await axios.get('/api/admin/booked-appointments', {
        params: { userId }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`/api/admin/appointments/${id}/accept`);
      fetchAppointments();
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/api/admin/appointments/${id}/reject`);
      fetchAppointments();
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  const renderAppointmentList = (status) => {
    return appointments
      .filter((appointment) => appointment.status === status)
      .map((appointment) => (
        <li key={appointment._id}>
          <p>
            <strong>Student Name:</strong> {appointment.name} <br />
            <strong>Lecturer Name:</strong> {JSON.parse(localStorage.getItem('user')).username} <br />
            <strong>Time Slot:</strong> {appointment.time} <br />
            <strong>Status:</strong> {appointment.status}
          </p>
          {status === 'Pending' && (
            <div>
              <Button onClick={() => handleAccept(appointment._id)} type="primary">
                Accept
              </Button>
              <Button onClick={() => handleReject(appointment._id)} type="danger" style={{ marginLeft: '10px' }}>
                Reject
              </Button>
            </div>
          )}
        </li>
      ));
  };

  return (
    <Layout>
      <div>
        <h1>Booked Appointments</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pending" key="1">
            <ul>{renderAppointmentList('Pending')}</ul>
          </TabPane>
          <TabPane tab="Accepted" key="2">
            <ul>{renderAppointmentList('Accepted')}</ul>
          </TabPane>
          <TabPane tab="Rejected" key="3">
            <ul>{renderAppointmentList('Rejected')}</ul>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BookedAppointments;
