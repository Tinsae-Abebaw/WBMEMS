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
    <div className="main-classs">
      <div className="the-title-navigation-main-class"><Home/><div className="title-and-date"><h2 className="the-navigation-title">Biomedical Head Dashboard</h2></div></div>
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
            <Link to='/DeviceOverview' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="dashboard-icons-bell"/>
          </div>Device Overview</div></Link>

            <Link to='/AnnouncementDisplay' className='main-my-link'><div className="alert-and-notification-show">
            <div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display-admin" : ''}>
            {NotificationCount !== 0 ? NotificationCount : <BsCheckAll className="tick"/>}
            </span></div></Link>

            <Link className="main-my-link" to='/Calendar'> <div className="dashboard-schedule-maintenance"> <FaRegCalendarAlt className="main-dashboard-icons"/>Calendar</div></Link>
          </div>
          <div className="navigation-section2">
            <div className="dashboard-schedule-maintenance"><MdOutlinePendingActions className="main-dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='main-my-link'><div className="dashboard-schedule-maintenance"><FaSort className="main-dashboard-icons"/>Sort By Department</div></Link>
            <Link to='/Report' className="main-my-link"><div className="dashboard-schedule-maintenance"> <TbReportAnalytics className="main-dashboard-icons"/>Reports</div></Link>
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
 
export default Dashboard;
