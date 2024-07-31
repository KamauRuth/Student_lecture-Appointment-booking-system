import '../layout.css'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge} from 'antd';

function Layout ({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData)
    const location = useLocation();
    const navigate = useNavigate();
    const userMenu = [
        {
            name: 'Home',
            path: '/home',
            icon:'ri-home-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon:'ri-file-list-line'
        },
        {
            name: 'My Appointments',
            path: '/my-appointments',
            icon:'ri-calendar-todo-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon:'ri-user-fill'
        },
        
        
    ];

    const lecturerMenu = [

        {
            name: 'Update Availability',
            path: '/update-availability',
            icon:'ri-user-line'
        },
        {
            name: 'Booked Appointments',
            path: '/booked-appointments',
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
            name: 'Add Department',
            path: '/add-department',
            icon:'ri-add-circle-line',
        },
        {
            name: 'Register Lecturers',
            path: '/register-lecturers',
            icon:'ri-user-add-line'
        },
        {
            name: 'profile',
            path: '/profile',
            icon:'ri-user-fill'
        },

    ]


    const isAdmin = user?.isAdmin;
    const isLecturer = user?.isLecturer;
    
    let menuToBeRendered = [];
    if (isAdmin) {
        menuToBeRendered = adminMenu;

    }else if(isLecturer){
        menuToBeRendered = lecturerMenu;
    }
    else{
        menuToBeRendered = userMenu;   
    }

       


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
                                <Badge count={user?.unseenNotifications?.length} onClick={()=>navigate('/notifications')}>
                            <i className="ri-notification-line header-action-icon mr-2 px-3"></i>
                            </Badge>
                            <Link className='anchor' to='/profile'>
                               {user?.name}
                            </Link> 

                            </div>
                        </div>
                        <div className="content-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

export default Layout;