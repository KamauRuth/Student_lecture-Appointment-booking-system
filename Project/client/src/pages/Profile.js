import React from 'react'
import { Card, Typography, Avatar, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout';

const { Title, Text } = Typography;




function Profile() {
    const [user, setUser] = useState([]);


   let token = localStorage.getItem("token");


  const getData = async () => {
    try {
      const response = await axios.get("api/user/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      } );
      console.log(response);
      if(response.status === 200){
        setUser(response.data.user)
      }
    } catch (error) {
      console.log("Error is:", error.message);
    }
  };
  useEffect(() => {
    getData();
  } , []);


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
          <Title level={4}>{user.name}</Title>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Text><strong>Email:</strong> {user.email}</Text>
        </Col>
        <Col span={24} style={{ marginTop: '10px' }}>
          <Text><strong>Phone:</strong> {user.phone}</Text>
        </Col>
        <Col span={24} style={{ marginTop: '10px' }}>
          <Text><strong>Address:</strong> {user.address}</Text>
        </Col>
      </Row>
    </Card>
  </div>
  </Layout>
  )
}

export default Profile;
