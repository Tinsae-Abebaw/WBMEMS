import React, { useEffect, useState } from "react";
import './EngineerDashboard.css'
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsCheckAll } from "react-icons/bs";
import { Link } from "react-router-dom";
import EngineerSidebar from "./EngineerSidebar";
import AnalyticalData from "../Piecharts/AnalyticalData/AnalyticalData";
import Piechart from "../Piecharts/Status/Piechart";
import EquipmentByCost from "../Piecharts/EquipmentByCost/EquipmentByCost";
import PieDepartment from "../Piecharts/Department/pieDepartment";
import Clock from "../Clock/Clock";
import WorkOrderStatus from "../Piecharts/workorderstatus/WorkOrderStatus";
import Staff from "../Piecharts/Staff/Staff";
import RequestType from "../Piecharts/RequestType/RequestType";
import axios from "axios";

const EngineerDashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
});
  useEffect(() => {
    NotificationNumber();
  }, []);

  useEffect(() => {
    console.log('the Engineer UGLO BANGADA',NotificationCount);
    console.log('the Engineer PABLO ESCOBAR',user.id);
  }, []);
  const NotificationNumber = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/alertAndNotification/getById', {
        params: {
          notificationType: 'Announcement',
          userIdentification: user.id,
        }
      });
      const counter = response.data.length;
      setNotificationCount(counter);
    } catch (error) {
      console.error('Error fetching the notifications', error);
    }
  };

  return (    
    <div className="main-classs">
      <div className="the-title-navigation-main-class"><EngineerSidebar/><div className="title-and-date"><h2 className="the-navigation-title">Engineer Dashboard</h2></div></div>
      <div className="three-sections">
          <div className="analytical-data-and-charts"> 
            <div className="analytical-device-data"><div className="doooooo"></div><AnalyticalData/></div> 
            <div className="first-section-doughnuts">
              <div className="admin-piechart-holder-status"><Piechart/></div>
              <div className="admin-piechart-holder-department-cost"><EquipmentByCost/></div>
              <div className="admin-piechart-holder-department"><PieDepartment/></div> 
          </div>
          </div>
        <div className="short-cuts">
        <Clock/>
          <div className="navigation-section1">
            <Link to='/EngineerDeviceShow' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="dashboard-icons-bell"/>
           </div>Device Overview</div></Link>

            <Link to='/EngineerAnnouncement' className='main-my-link'><div className="alert-and-notification-show">
            <div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display-eng" : ''}>
            {NotificationCount !== 0 ? NotificationCount : <BsCheckAll className="tick"/>}
            </span></div></Link>

            <Link className="main-my-link" to='/EngineerInventoryCalendar'> <div className="dashboard-schedule-maintenance"> <FaRegCalendarAlt className="main-dashboard-icons"/>Calendar</div></Link>
            <Link to ='/EngineerSortByDep' className='main-my-link'><div className="dashboard-schedule-maintenance"><FaSort className="main-dashboard-icons"/>Sort By Department</div></Link>

          </div>
          </div>
      </div>
      <div className="head-piechart-in-the-dashboardd">
          <div className="admin-piechart-holder-department"><WorkOrderStatus/></div>
          <div className="admin-piechart-holder-department"><Staff/></div>           
          <div className="admin-piechart-holder-department"><RequestType/></div> 
        </div>

        <div className="head-dashboard-bottom-bar">

        </div>
    </div>
   );
}
 
export default EngineerDashboard;