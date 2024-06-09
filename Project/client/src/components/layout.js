import '../layout.css'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Layout ({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon:'ri-home-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon:'ri-file-list-line'
        },
        {
            name: 'Apply Lecturer',
            path: '/apply-lecturer',
            icon:'ri-school-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon:'ri-user-fill'
        },
        {
            name: 'logout',
            path: '/logout',
            icon:'ri-logout-box-line'
        }
    ];
    const menuToBeRendered = userMenu

        return(
            <div className="main">
                <div className="d-flex layout">
                    
                    <div className="sidebar">

                        <div className="sidebar-header">
                            <h1>SLABS</h1>
                        </div>

                        <div className="menu">
                           {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path ? 'active' : '';
                            return <div className={`d-flex menu-item ${isActive ? 'active-menu-item' : ''}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                   </div>
                               
                            })}  
                        </div>
                        
                    </div>
                    <div className="content">
                        <div className="content-header">
                            {collapsed ?<i className="ri-menu-fill header-action-icon" onClick={()=>setCollapsed(false)}></i> : <i className="ri-close-fill header-action-icon" onClick={()=>setCollapsed(true)}></i>}

                            <div className="d-flex">
                            <i className="ri-notification-line header-action-ico"></i>

                            </div>
                        </div>
                        <div className="content-body">
                            {children.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

export default Layout;