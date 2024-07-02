import React, { useState, useEffect } from 'react';
import { Card, Typography, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import Layout from '../components/layout';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

 // const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('user'));


    if (!token) {
      setError('No token found');
      return;
    
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
              <Col span={24}>
                <Title level={4}>{currentUser.username}</Title>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Text><strong>Username:</strong> {currentUser.username}</Text>
              </Col>
              <Col span={24}>
                <Text><strong>Email:</strong> {currentUser.email}</Text>
              </Col>
            </Row>
          </Card>
      </div>
    </Layout>
  );
}

export default Profile;
