//Home.jsx
import React, { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineBorderColor } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import UserInfo from '../StateManagement/UserInfo';
import LogOut from '../components/auth/LogOut';
import { MdHistoryToggleOff } from "react-icons/md";
import { CiLogout, CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import './DoctorSidebar.css';

const DoctorSidebar = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='doctor-hum-button'/>
      <div className={`doctor-main-menu ${sidebarOpen ? 'doctor-open' : ''}`}>
        <div className='section-one'>
        <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='doctor-nav-bar'>
          <Link className='link' to='/DoctorDashboard'><div className='lists'><AiOutlineHome className='icons'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/DoctorDeviceShow'><div className='lists'><MdOutlineWorkOutline className='icons'/><div>Devices Overview</div></div></Link> 
          <Link className='link' to='/Requests'><div className='lists'><MdOutlineBorderColor className='icons' /><div>Requests</div></div></Link>
          <Link className='link' to='/RequestHistory'><div className='lists'><MdHistoryToggleOff className='icons' /><div>Request History</div></div></Link>
          <Link className='link' to='/DoctorAnnouncement'><div className='lists'><CiMedicalClipboard className='icons' /><div>Announcement Board</div></div></Link>
        </nav>
            <LogOut/>
        <div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
