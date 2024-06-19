import { Table } from 'antd';
import Layout  from '../../components/layout'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Lecturerlist() {
  const {lecturers, setLecturers} = useState([]) 

  const getData = async () => {
    try {
      const response = await axios.get("api/user/get-all-lecturers", {token: localStorage.getItem("token")}, );
      console.log(response.data);
      if(response.data.success){
        setLecturers(response.data.data)
      }
    } catch (error) {
      console.log("Error is:", error.message);
    }
  };
  useEffect(() => {
    getData();
  } , []);

  const columns = [
    {
      title: 'name',
      dataIndes: 'name',
      render: (text, record)=> <h1 className='normal-text'>{record.firstname} {record.lastname} </h1>
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render:(text, record)=>(
        <div className='d-flex'>
          {record.status === 'pending' &&
          <h1 className='anchor'>Block</h1>
    }6
        </div>
      )
    }
  ]

  return (
    <Layout>
      <h1 className='page-header'>Lecturers list</h1>
      <Table columns={columns} dataSource={lecturers}/>
    </Layout>

  )
}

export default Lecturerlist;
