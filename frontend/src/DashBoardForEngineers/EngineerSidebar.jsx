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
import './EngineerSidebar.css';


const EngineerSidebar = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo-engineer'>
      <FaBars onClick={toggleSidebar}  className='hum-button-engineer'/>
      <div className={`main ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one-engineer'>
        <div onClick={toggleSidebar}><CiLogout className='close-button-engineer'/></div>
          <div className='profile-picture-engineer'>
            <UserInfo/>
          </div>
        </div>
        <nav className='nav-bar-engineer'>
           
          <Link className='link' to='/RequestsForEngineer'><div className='lists'><MdOutlineBorderColor className='icons' /><div>WorkOrders</div></div></Link>
          <Link className='link' to='/RequestsByEngineer'><div className='lists'><MdOutlineBorderColor className='icons' /><div>Requests</div></div></Link>
          <Link className='link' to='/EngineerAnnouncement'><div className='lists'><CiMedicalClipboard className='icons' /><div>Announcement Board</div></div></Link>
          
        </nav>
            <LogOut/>
        <div>
        </div>
      </div>
    </div>
  );
};

export default EngineerSidebar;
