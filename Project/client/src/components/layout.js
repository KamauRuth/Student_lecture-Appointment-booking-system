import '../layout.css'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Layout ({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
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
        
        
    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon:'ri-home-line'
        },
        {
            name: 'users',
            path: '/users',
            icon:'ri-user-line'
        },
        {
            name: 'Lecturers',
            path: '/lecturers',
            icon:'ri-school-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon:'ri-user-fill'
        },
      

    ];

    const menuToBeRendered = userMenu

        return(
            <div className="main">
                <div className="d-flex layout">
                    
                    <div className="sidebar">

                        <div className="sidebar-header">
                            <h1 className='logo'>SLABS</h1>
                        </div>

                        <div className="menu">
                           {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path ? 'active' : '';
                            return <div className={`d-flex menu-item ${isActive ? 'active-menu-item' : ''}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                   </div>
                               
                            })} 
                            <div className={"d-flex menu-item"} onClick={()=>   window.confirm('Are you sure you want to logout?') && (
                                navigate('/login')
                            )}> 
                                <i className="ri-logout-circle-line"></i>
                                {!collapsed && <Link to='/login'>Logout</Link>}
                            </div>

                        </div>
                        
                    </div>
                    <div className="content">
                        <div className="content-header">
                            {collapsed ?<i className="ri-menu-fill header-action-icon" onClick={()=>setCollapsed(false)}></i> : <i className="ri-close-fill header-action-icon" onClick={()=>setCollapsed(true)}></i>}

                            <div className="d-flex align-items-center px-4">
                            <i className="ri-notification-line header-action-icon mr-2 px-3"></i>
                            <Link className='anchor' to='/profile'>{user? user.name:'kamau'}</Link> 

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