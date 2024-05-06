import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsCheckAll } from "react-icons/bs";
import { Link } from "react-router-dom";
import Home from "./Home";
import Piechart from "../../Piecharts/Status/Piechart";
import PieDepartment from "../../Piecharts/Department/pieDepartment";
import axios from "axios";
import WorkOrderStatus from "../../Piecharts/workorderstatus/WorkOrderStatus";
import RequestType from "../../Piecharts/RequestType/RequestType";
import EquipmentByCost from "../../Piecharts/EquipmentByCost/EquipmentByCost";
import AnalyticalData from "../../Piecharts/AnalyticalData/AnalyticalData";
import Staff from "../../Piecharts/Staff/Staff";
import Clock from "../../Clock/Clock";
import { useSelector } from 'react-redux';
import { BsDisplayFill } from "react-icons/bs";

import { IoIosSearch } from "react-icons/io";


const Dashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const { user } = useSelector(state => state.user);
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? storedUserId : null;
  });

  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem('userId', user.id);
      setUserId(user.id);
    }
  }, [user]);


  useEffect(() => {
    console.log('the main UGLO BANGADA',NotificationCount);
    console.log('the main PABLO ESCOBAR',userId);
  }, []);
  useEffect(() => {
    if (!userId) return; // Don't make API call if userId is not available
    NotificationNumber();
  }, [userId]);

  const NotificationNumber = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/alertAndNotification/getById', {
        params: {
          notificationType: 'Announcement',
          userIdentification: userId,
        }
      });
      const counter = response.data.length;
      setNotificationCount(counter);
    } catch (error) {
      console.error('Error fetching the notifications', error);
    }
  };
  
  return (    
    <div className="main-classs-head">
      <div className="the-title-navigation-main-class"><Home/><div className="title-and-date-head">
        <h2 className="the-navigation-title">Biomedical Head Dashboard</h2>
        <div className="dashboard-input-and-picture"><div className="input-and-search-icon">
          <input type="text" className="dashboard-input"/><IoIosSearch className="search-icon-dashboard"/></div>
     </div></div>
        </div>
      <div className="three-sections">
          <div className="analytical-data-and-charts"> 
            <div className="analytical-device-data"><div className="doooooo"></div><AnalyticalData/></div> 
            <div className="first-section-doughnuts">
              <div className="admin-piechart-holder-status111"><Piechart/></div>
              <div className="admin-piechart-holder-department-cost111"><EquipmentByCost/></div>
              <div className="admin-piechart-holder-department"><WorkOrderStatus/></div>
          </div>
          </div>
        <div className="short-cuts-head">
        <Clock/>
          <div className="navigation-section111">
            <Link to='/DeviceOverview' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="the-main-dashboard-icons"/>
          </div>Device Overview</div></Link>

            <Link to='/AnnouncementDisplay' className='main-my-link'><div className="alert-and-notification-show">
            <div className="bell-and-notification-count"> <IoNotifications className="the-main-dashboard-icons"/> 
            </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display-admin" : ''}>
            {NotificationCount !== 0 ? NotificationCount : <BsCheckAll className="tick-tick"/>}
            </span></div></Link>

            <Link className="main-my-link" to='/Calendar'> <div className="dashboard-schedule-maintenance"> <FaRegCalendarAlt className="the-main-dashboard-icons"/>Calendar</div></Link>
          </div>
          <div className="navigation-section222">
            <div className="dashboard-schedule-maintenance"><MdOutlinePendingActions className="the-main-dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='main-my-link'><div className="dashboard-schedule-maintenance"><FaSort className="the-main-dashboard-icons"/>Sort By Department</div></Link>
            <Link to='/Report' className="main-my-link"><div className="dashboard-schedule-maintenance"> <TbReportAnalytics className="the-main-dashboard-icons"/>Reports</div></Link>
          </div>
          
          </div>
      </div>
      <div className="head-piechart-in-the-dashboardd">
          <div className="admin-piechart-holder-department111"><PieDepartment/></div> 
          <div className="admin-piechart-holder-department"><Staff/></div>           
          <div className="admin-piechart-holder-department"><RequestType/></div> 
        </div>

        <div className="head-dashboard-bottom-bar">

        </div>
    </div>
   );
}
 
export default Dashboard;
