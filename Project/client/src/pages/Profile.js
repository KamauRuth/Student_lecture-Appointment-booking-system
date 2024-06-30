import React from 'react'
import { Card, Typography, Avatar, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;



function Profile ()  {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  if (!token) {
    console.error('No token found');
    toast.error('No token found');
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [profile, setProfile] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const response = await axios.get('/api/user/profile')
    setProfile(response.data.profile);
    
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized');
      // Redirect to login or show a message
      
    } else {
      console.error('Error fetching profile:', error.response ? error.response.data : error.message);
    }
  }




  return (
    <Layout>
      <div style={{ padding: '50px' }}>
        <Title level={2}>Profile</Title>
        <Card>
          <Row align="middle">
            <Col span={4}>
              <Avatar size={64}>JD</Avatar>
            </Col>
            <Col span={20}>
              <Title level={4}>{ }</Title>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Text><strong>Username:</strong> {currentUser.username}</Text>
            </Col>
            <Col span={24}>
              <Text><strong>Email:</strong> {profile.email}</Text>
            </Col>
          </Row>
        </Card>
      </div>
    </Layout>
  )
}
}




export default Profile;
