import React, { useState, useEffect } from 'react';
import { Tabs, List, Button } from 'antd';
import axios from 'axios';
import Layout from '../components/layout';

const { TabPane } = Tabs;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      const response = await axios.get('/api/user/appointments', { params: { userId } });
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const renderAppointments = (status) => {
    return (
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={appointments.filter((appointment) => appointment.status === status)}
        renderItem={(appointment) => (
          <List.Item>
            <List.Item.Meta
              title={`Appointment with ${appointment.lecturerName}`}
              description={`Date: ${appointment.date}, Time: ${appointment.time}, Reason: ${appointment.reason}`}
            />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Layout>
      <h1>My Appointments</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Pending" key="1">
          {renderAppointments('Pending')}
        </TabPane>
        <TabPane tab="Accepted" key="2">
          {renderAppointments('Accepted')}
        </TabPane>
        <TabPane tab="Rejected" key="3">
          {renderAppointments('Rejected')}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default MyAppointments;
