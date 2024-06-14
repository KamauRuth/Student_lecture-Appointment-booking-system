import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Header() {
    const [collapsed, setCollapsed] = useState(false);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return (
    <div>
      <div className="content">
                 <div className="content-header">
                            {collapsed ?<i className="ri-menu-fill header-action-icon" onClick={()=>setCollapsed(false)}></i> : <i className="ri-close-fill header-action-icon" onClick={()=>setCollapsed(true)}></i>}

                            <div className="d-flex align-items-center px-4">
                            <i className="ri-notification-line header-action-icon mr-2 px-3"></i>
                            <Link className='anchor' to='/profile'>{user?.user}</Link> 

                     </div>
        </div>  
        </div>          

    </div>
  )
}

export default Header
