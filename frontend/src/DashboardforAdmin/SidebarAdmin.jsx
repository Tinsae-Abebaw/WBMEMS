//Home.jsx
import React, { useState } from 'react';
import { IoIosHome } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiSquareQuestion } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaFileContract,FaFileAlt } from "react-icons/fa";
import LogOut from '../components/auth/LogOut';
import UserInfo from '../StateManagement/UserInfo';
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";
import './SidebarAdmin.css';


const AdminstratorHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='hum-button'/>
      <div className={`main-manu-admin ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='home-nav-bar'>
          <Link className='link' to='/AdminstratorDashboard'><div className='main-lists'><IoIosHome className='icons'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/AdminDeviceOverview'><div className='main-lists'><MdWorkHistory className='icons'/><div>Equipment Overview</div></div></Link> 
          <Link className='link' to='/RequestedAdmin'><div className='main-lists'><CiSquareQuestion className='icons'/><div>Requested Issues</div></div></Link>
          <Link className='link' to='/AdminDisposedDevices'><div className='main-lists'><RiDeleteBin6Line className='icons'/><div>Disposed Equipments</div></div></Link>
          <Link className='link' to='/AdminContract'><div className='main-lists'><FaFileContract className='icons'/><div>Contract List</div></div></Link> 
          <Link className='link' to='/AdminTrainingManagement'><div className='main-lists'><FaPeopleGroup className='icons'/><div>Training Management</div></div></Link> 
          <Link className='link' to='/ViewAllRequestAdmin'><div className='main-lists'>< MdOutlinePreview className='icons'/><div>All Requests</div></div></Link> 
          <Link className='link' to='/Announcement'><div className='main-lists'><TfiAnnouncement className='icons'/><div>Announcement Board</div></div></Link>
          <Link className='link' to='/AdminCreateAccount'><div className='main-lists'><MdAccountBox className='icons'/><div>Create Account</div></div></Link> 
          <Link className='link' to='/AdminStaffInformation'><div className='main-lists'><GrUserWorker className='icons'/><div>Staff Information</div></div></Link>    
        </nav>
         <LogOut/>
        <div>
          
        </div>
      </div>
    </div>
  );
};
export default AdminstratorHome;
