import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Home from "./Home";
import Piechart from "../../Piecharts/Status/Piechart";
import PieDepartment from "../../Piecharts/Department/pieDepartment";
import axios from "axios";
import BarChart from "../../Piecharts/BarChart";



const Dashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  useEffect(() => {
    NotificationNumber();
  }, [NotificationCount]);

  useEffect(() => {
   
  }, []);
  const NotificationNumber = async()=>{
    try{
      const response = await axios.get(`http://localhost:7000/api/alertAndNotification/getByType?notificationType=${'Announcement'}`);
      console.log('The response data:', response.data);
      const counter = response.data.length;
      setNotificationCount(counter);
    }catch(error){
      console.error('error fetching the notifications', error);
    }
  };
  return (    
    <div className="main-class">
      <div className="right-part">
        <div className="the-navigation-main-class"><Home/><h2 className="the-navigation-title">Navigation</h2></div>
        <div className="admin-sub-class">
            <Link to='/DeviceOverview' className='my-link'><div className="admin-dashboard-device-overview"> <GrOverview className="main-dashboard-icons"/>Device Overview</div></Link>
            <Link to='/AnnouncementDisplay' className='my-link'><div className="alert-and-notification-show"><div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            <span className={NotificationCount !== 0 ? "notification-count-display" : 'notification-null-count'}>
            {NotificationCount !== null ? NotificationCount : ''}
            </span></div>Announcement Board</div></Link>
            <Link className="my-link" to='/workorder'> <div className="dashboard-schedule-maintenance"> <FaRegCalendarAlt className="main-dashboard-icons"/>Schedule Maintenance</div></Link>
          
            <div className="dashboard-schedule-maintenance"><MdOutlinePendingActions className="main-dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='my-link'><div className="dashboard-schedule-maintenance"><FaSort className="main-dashboard-icons"/>Sort By Department</div></Link>
            <Link to='/Report' className="my-link"><div className="dashboard-schedule-maintenance"> <TbReportAnalytics className="main-dashboard-icons"/>Reports</div></Link>

        </div>

        <div className="piechart-in-the-dashboard">
            <div className="piechart-holder-status"><Piechart/></div>
            <div className="piechart-holder-department"><PieDepartment/></div>            
         </div>
         <div className="piechart-holder-department"><BarChart/></div>
      </div>
      <div className="dashboard-bottom-bar">
          <h1 className="dashboard-computer-and-title">
            <TiDeviceDesktop className="computer-icon" />
            MDMiS for your company</h1>
            <p className="bottombar-description">Comprehensive platform designed to streamline 
              the monitoring, tracking, and maintenance of medical 
              devices within healthcare facilities.
              This system integrates various functionalities, including inventory management, 
              equipment tracking, maintenance scheduling, and regulatory compliance monitoring, 
              into a centralized online platform accessible from any web-enabled device.</p>

      </div>
    </div>
   );
}
 
export default Dashboard;