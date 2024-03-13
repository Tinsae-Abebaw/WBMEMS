//Home.jsx
import React, { useState } from 'react';
import './Home.css';
import { IoIosHome } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import UserInfo from '../../StateManagement/UserInfo';
import LogOut from '../../components/auth/LogOut';
import { CiSquareQuestion } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaFileAlt } from 'react-icons/fa';
import ChangeProfilePicture from '../../components/Setting/Setting';
import { VscGitPullRequestNewChanges } from "react-icons/vsc";


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='hum-button'/>
      <div className={`main-manu ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='home-nav-bar'>
          <Link className='link' to='/Dashboard'><div className='lists'><IoIosHome className='icons'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/Inventory'><div className='lists'><MdInventory className='icons'/><div>Inventory</div></div></Link> 
          <Link className='link' to='/DeviceOverview'><div className='lists'><MdWorkHistory className='icons'/><div>Devices Overview</div></div></Link> 
          <Link className='link' to='/workorder'><div className='lists'><MdOutlineBorderColor className='icons' /><div>Work Order</div></div></Link> 
          <Link className='link' to='/Requested'><div className='lists'><CiSquareQuestion className='icons'/><div>Requested Issues</div></div></Link>
          <Link className='link' to='/DisposedDevices'><div className='lists'><RiDeleteBin6Line className='icons'/><div>Disposed Equipments</div></div></Link>
          <Link className='link' to='/Report'><div className='lists'><FaFileAlt className='icons'/><div>Report</div></div></Link> 
          <Link className='link' to='/Announcement'><div className='lists'><TfiAnnouncement className='icons'/><div>Announcement</div></div></Link>
          <Link className='link' to='/CreateAccount'><div className='lists'><MdAccountBox className='icons'/><div>Create Account</div></div></Link> 
          <Link className='link' to='/StaffInformation'><div className='lists'><GrUserWorker className='icons'/><div>Staff Information</div></div></Link>
        
        </nav>
         <LogOut/>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
