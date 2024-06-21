import { Tabs } from 'antd';
import Layout from '../components/layout'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Notifications() {
    const navigate = useNavigate();
   const user = localStorage.getItem("user");
   const parsedUser = JSON.parse(user)
   const username = parsedUser.username
  const [notifications, setNotifications] = useState([])
    useEffect(() => {
      const getNotifications = async () => {
        try {
          const response = await axios.post('/api/admin/notifications', {username: username });
          console.log(response);
          if(response.status === 200){
            setNotifications(response.data.notifications.unseenNotifications)
          }
        } catch (error) {
          console.log("An error occcured", error)
        }
      }
      getNotifications()
    },[])

  return (

    <Layout>
        <h1 >Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab= "unseen" key={0}>
              <div className='d-flex justify-content-end' >
                <h1 className='anchor'>Mark all as seen</h1>
              </div>
            </Tabs.TabPane>

            
             <div  className="card p-2" onClick={()=> navigate()}>
                <div className="card-text"></div>
            </div>
        
            <Tabs.TabPane tab= "seen" key={1}>
                <div className='d-flex justify-content-end'>
                    <h1 className='anchor'>Delete all</h1>
                </div>
            </Tabs.TabPane>
        </Tabs>

{
  notifications.map((notifcations, index) => {
   return (
    <ul
    key={index}
    
    >
      <li>
        {notifcations.message}
      </li>
    </ul>
   )

  })
}
    </Layout>
  )
}

export default Notifications;
