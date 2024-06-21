import { Table } from 'antd';
import Layout  from '../../components/layout'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Lecturerlist() {
  const [lecturers, setLecturers] = useState([]);
  const [updated, setUpdated] = useState(false);

  let token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const response = await axios.get("api/admin/get-all-lecturers", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      } );
      console.log(response);
      if(response.status === 200){
        setLecturers(response.data.lecturers)
      }
    } catch (error) {
      console.log("Error is:", error.message);
    }
  };
  useEffect(() => {
    getData();
  } , [updated]);

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
          {record.status === 'pending' &&<h1 onClick={() => handleApprove(record._id)} className='anchor'>Approve</h1>}
          {record.status === 'approved' &&<h1 className='anchor'>Block</h1>}
        </div>
      )
    }
  ]

  const handleApprove =async (id) => {
    try {
      const response = await axios.post("api/admin/approve-lecturer", {user_id: id}, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      } );
      console.log(response);
      if(response.status === 200){
        setUpdated(!updated)
      }
    } catch (error) {
      console.log("Error is:", error.message);
    }
  }
  return (
    <Layout>
      <h1 className='page-header'>Lecturers list</h1>
      <Table columns={columns} dataSource={lecturers} key={0} />
    </Layout>

  )
}

export default Lecturerlist;
