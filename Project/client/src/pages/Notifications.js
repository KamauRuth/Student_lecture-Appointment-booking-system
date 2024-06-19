import { Tabs } from 'antd';
import Layout from '../components/layout'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Notifications() {
    const {user} = useSelector((state)=> state.user)
    const navigate = useNavigate();
   
  

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
    </Layout>
  )
}

export default Notifications;
