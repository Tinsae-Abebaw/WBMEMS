import React, { useEffect, useState } from "react";
import './DoctorDashboard.css';
import DoctorSidebar from "./DoctorSidebar";
import Home from "../pages/Home/Home";
import Piechart from "../Piecharts/Status/Piechart";
import PieDepartment from "../Piecharts/Department/pieDepartment";
import BarChart from "../Piecharts/BarChart";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrOverview, GrSchedule } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";

const DoctorDashboard = () => {

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
      <div className="doctor-main-class">
      <div className="doctor-dashboard-home"></div>
      <div className="doctor-right-part">
        <div className="the-navigation-main-class"><DoctorSidebar/><h2 className="the-navigation-title">Navigation</h2></div>
        <div className="doctor-sub-class">
            <Link to='/DoctorDeviceShow' className='my-link'><div className="doctor-dashboard-device-overview"> <GrOverview className="dashboard-icons"/>Device Overview</div></Link>
            <Link to='/DoctorAnnouncement' className='my-link'><div className="alert-and-notification-show"><div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            <span className={NotificationCount !== 0 ? "notification-count-display" : 'notification-null-count'}>
            {NotificationCount !== null ? NotificationCount : ''}
            </span></div>Announcement Board</div></Link>          
            <Link to ='/DoctorSortByDep' className='my-link'><div className="doctor-sort-by-dep"><FaSort className="dashboard-icons"/>Sort By Department</div></Link>
        </div>

        <div className="piechart-in-the-dashboard">
            <div className="piechart-holder-status"><Piechart/></div>
            <div className="piechart-holder-department"><PieDepartment/></div>            
         </div>
         <div className="piechart-holder-department"><BarChart/></div>
      </div>
     
    </div>
   );
}
 
export default DoctorDashboard;