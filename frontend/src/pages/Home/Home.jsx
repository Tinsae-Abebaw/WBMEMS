//Home.jsx
import React, { useState } from 'react';
import './Home.css';
import { IoIosHome } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import UserInfo from '../../StateManagement/UserInfo';
import LogOut from '../../components/auth/LogOut';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaFileContract,FaFileAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaMicrophone } from "react-icons/fa";



const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='hum-button-head'/>
      <div className={`main-manu-head ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='home-nav-bar'>
          <Link className='link' to='/Dashboard'><div className='main-lists'><IoIosHome className='icons'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/Inventory'><div className='main-lists'><MdInventory className='icons'/><div>Inventory</div></div></Link> 
          <Link className='link' to='/DeviceOverview'><div className='main-lists'><MdWorkHistory className='icons'/><div>Devices Overview</div></div></Link> 
          <Link className='link' to='/Schedule'><div className='main-lists'><FaRegCalendarAlt className='icons'/><div>Schedule Work</div></div></Link> 
          <Link className='link' to='/Requested'><div className='main-lists'><BiSolidCommentDetail className='icons'/><div>Requested Issues</div></div></Link>
          <Link className='link' to='/DisposedDevices'><div className='main-lists'><RiDeleteBin6Line className='icons'/><div>Disposed Equipments</div></div></Link>
          <Link className='link' to='/TrainingManagement'><div className='main-lists'><FaPeopleGroup className='icons'/><div>Training Events</div></div></Link>
          <Link className='link' to='/Report'><div className='main-lists'><FaFileAlt className='icons'/><div>Report</div></div></Link> 
          <Link className='link' to='/Announcement'><div className='main-lists'><FaMicrophone className='icons'/><div>Announcement</div></div></Link>
          <Link className='link' to='/CreateAccount'><div className='main-lists'><MdAccountBox className='icons'/><div>Create Account</div></div></Link> 
          <Link className='link' to='/StaffInformation'><div className='main-lists'><GrUserWorker className='icons'/><div>Staff Information</div></div></Link>
        
        </nav>
         <LogOut/>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
