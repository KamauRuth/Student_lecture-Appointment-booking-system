import { Tabs, Button } from 'antd';
import Layout from '../components/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Notifications() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);
  const username = parsedUser.username;
  const isLecturer = parsedUser.isLecturer;
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.post('/api/admin/notifications', { username, isLecturer });
        console.log("Response: ", response.data);
        if (response.status === 200) {
          setUnseenNotifications(response.data.notifications.unseenNotifications);
          setSeenNotifications(response.data.notifications.seenNotifications);
        }
      } catch (error) {
        console.log('An error occurred', error);
      }
    };
    getNotifications();
  }, [username]);

  const markAllAsSeen = async () => {
    try {
      const response = await axios.post('/api/admin/mark-all-as-seen', { username });
      console.log("Username: ", username);
      if (response.status === 200) {
        setSeenNotifications([...seenNotifications, ...unseenNotifications]);
        setUnseenNotifications([]);
      }
    } catch (error) {
      console.log('An error occurred while marking notifications as seen', error);
    }
  };

  const deleteAllSeen = async () => {
    try {
      const response = await axios.post('/api/admin/delete-all-seen', { username });
      if (response.status === 200) {
        setSeenNotifications([]);
      }
    } catch (error) {
      console.log('An error occurred while deleting seen notifications', error);
    }
  };

  return (
    <Layout>
      <h1>Notifications</h1>
      <Tabs defaultActiveKey="0">
        <Tabs.TabPane tab="Unseen" key="0">
          <div className='d-flex justify-content-end'>
            <Button onClick={markAllAsSeen} type="primary">Mark all as seen</Button>
          </div>
          {unseenNotifications.map((notification, index) => (
            <div key={index} className="card p-2" onClick={() => navigate(notification.data.onclick)}>
              <div className="card-text">{notification.message}</div>
              <ul>
                <li>{notification.data.name}</li>
                <li>{notification.data.email}</li>
                <li>{notification.data.reason}</li>
              </ul>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Seen" key="1">
          <div className='d-flex justify-content-end'>
            <Button onClick={deleteAllSeen} type="danger">Delete all</Button>
          </div>
          {seenNotifications.map((notification, index) => (
            <div key={index} className="card p-2" onClick={() => navigate(notification.data.onclick)}>
              <div className="card-text">{notification.message}</div>
              <ul>
                <li>{notification.data.name}</li>
                <li>{notification.data.email}</li>
                <li>{notification.data.reason}</li>
              </ul>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
