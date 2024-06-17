import React from 'react'
import Layout from '../components/layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';




function ApplyLecturer() {
  const dispatch = useDispatch();


  const onFinish = values => {
    try {
      if (form.password !== confirmpassword) {
        return toast.error('Passwords do not match');
      }
      const response = await axios.post('/api/user/register', form)
      const data = await response.data;
    
      if (data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error is:", error.message)
      toast.error('An error occurred');
    }
  };
  

  return (
   
     <Layout>
      <h1>Apply Lecturer</h1>
      <hr />
    
       <Form layout='vertical' onFinish={onFinish}>
         <h1 className='card-title mt-3' >Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="First Name" name="firstname" rules={[{required : true}]}>
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Last Name" name="lastname" rules={[{required : true}]}>
              <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Email" name="email" rules={[{required : true}]}>
              <Input placeholder="Enter your staff email" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Phone Number" name="phoneNumber" rules={[{required : true}]}>
              <Input placeholder="E.g +254 7123456789" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Address" name="address" rules={[{required : true}]}>
              <Input placeholder="Enter your address" />
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h1 className='card-title mt-3' >Professional Information</h1>
          <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Courses" name="courses" rules={[{required : true}]}>
              <Input placeholder="Enter your courses" />
            </Form.Item>
          </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Experience" name="experience" rules={[{required : true}]}>
              <Input placeholder="Enter your experience" type='number' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Timings" name="timings" rules={[{required : true}]}>
              <TimePicker.RangePicker />
              </Form.Item>
            </Col>
          </Row>

          <div className='d-flex justify-content-end'>
            <Button className='primary-button' htmlType='submit'>Submit</Button>
          </div>
    
       </Form>
      </Layout>
   
 )

};


export default ApplyLecturer;
