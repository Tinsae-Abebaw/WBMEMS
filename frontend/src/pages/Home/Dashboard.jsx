import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { FiActivity } from "react-icons/fi";
import { CiSquareQuestion } from "react-icons/ci";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { TbDeviceAnalytics } from "react-icons/tb";
import { CiTimer } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
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
import PerformanceGraph from "../../Piecharts/Performance/Performance";


const Dashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const { user } = useSelector(state => state.user);
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? storedUserId : null;
  });

  const [deviceCounter, setDeviceCounter] = useState(null);
  const [requestCounter, setRequestCounter] = useState(null);
  const [requestAcceptedCounter, setRequestAcceptedCounter] = useState(null);
  const [requestPendingCounter, setRequestPendingCounter] = useState(null);
  const [requestCompletedCounter, setRequestCompletedCounter] = useState(null);
  const [costCounter, setCostCounter] = useState(null);

  useEffect(() => {
    FetchTotalNumberOfEquipments();
    FetchTotalNumberOfRequests();
    FetchTotalNumberOfCost();
  
}, []);

const FetchTotalNumberOfEquipments = async () => {
  try {
      const response = await axios.get('http://localhost:7000/api/deviceRegistration');
      setDeviceCounter(response.data.length);
  } catch (error) {
      console.error('Error fetching total number of equipments:', error);
  }
};

const FetchTotalNumberOfCost = async () => {
  try {
      const response = await axios.get('http://localhost:7000/api/reportOptions');
      let cost = 0;
      response.data.forEach(item => {
          cost += item.replacementCostInETB;
      });
      setCostCounter(cost);
  } catch (error) {
      console.error('Error fetching total cost:', error);
  }
};

const FetchTotalNumberOfRequests = async () => {
  try {
      const response = await axios.get('http://localhost:7000/api/requestOptions');
      setRequestCounter(response.data.length);

      let acceptedCount = 0;
      let pendingCount = 0;
      let completedCount = 0;

      response.data.forEach(item => {
          switch (item.status) {
              case 'Accepted':
                  acceptedCount++;
                  break;
              case 'Pending':
                  pendingCount++;
                  break;
              case 'Completed':
              case 'Arranged':
              case 'Purchased':
                  completedCount++;
                  break;
              default:
                  break;
          }
      });

      setRequestAcceptedCounter(acceptedCount);
      setRequestPendingCounter(pendingCount);
      setRequestCompletedCounter(completedCount);
  } catch (error) {
      console.error('Error fetching total number of requests:', error);
  }
};


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
      <div className="the-title-nav-main-class"><div className="holder">
      <Home/>
        <h2 className="the-navigation-title">Biomedical Head Dashboard</h2>
      </div>
        </div>
      <div className="three-sections">
          <div className="analytical-data-and-charts"> 
            <div className="analytical-device-data"><AnalyticalData/></div>

            <div className="first-section-doughnuts">
              <div className="admin-piechart-holder-status111"><Piechart/></div>
              <div className="admin-piechart-holder-department-cost111"><EquipmentByCost/></div>
              <div className="admin-piechart-holder-department"><WorkOrderStatus/></div>
          </div>
          </div>
        <div className="short-cuts-head">
        <Clock/>
          <div className="nav-section1">
            <Link to='/DeviceOverview' className='main-my-link'><div className="admin-shortcut-device-overview"> <div className="bell-and-notification-count"><GrOverview className="the-main-dashboard-icons"/>
          </div>Device Overview</div></Link>

            <Link to='/AnnouncementDisplay' className='main-my-link'><div className="alert-and-notif-show">
            <div className="bell-and-notification-count"> <IoNotifications className="the-main-dashboard-icons"/> 
            </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display-admin" : ''}>
            {NotificationCount !== 0 ? NotificationCount : <BsCheckAll className="tick-tick"/>}
            </span></div></Link>

            <Link className="main-my-link" to='/Calendar'> <div className="dash-schedule-maintenance"> <FaRegCalendarAlt className="the-main-dashboard-icons"/>Calendar</div></Link>
          </div>
          <div className="nav-section2">
            <div className="dashboard-schedule-maint"><MdOutlinePendingActions className="the-main-dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='main-my-link'><div className="dashboard-schedule-maint"><FaSort className="the-main-dashboard-icons"/>Sort By Department</div></Link>
            <Link to='/Report' className="main-my-link"><div className="dashboard-schedule-maint"> <TbReportAnalytics className="the-main-dashboard-icons"/>Reports</div></Link>
          </div>
          <div className="nav-section3">
                <div className="paired">
                  <div className="analytical-icons11">
                      <div className="icon-and-title2"><TbDeviceAnalytics className="ecg"/><h3>Total Equipments</h3></div>
                      <div className="real-number-data">{deviceCounter}</div>
                  </div>
                  <div className="analytical-icons22">
                      <div className="icon-and-title2"><FiActivity className="ecg"/><h3>Spent Cost</h3></div>
                      <div className="dollar">
                          <div className="etb">ETB</div>
                          <div className="real-number-data">{costCounter}</div>
                      </div>
                  </div>
                </div>
                <div className="paired">
                  <div className="analytical-icons33">
                      <div className="icon-and-title2"><CiSquareQuestion className="ecg"/><h3>Total Requests</h3></div>
                      <div className="real-number-data">{requestCounter}</div>
                  </div>
                  <div className="analytical-icons44">
                      <div className="icon-and-title2"><HiOutlineHandThumbUp className="ecg"/><h3>Accepted Requests</h3></div>
                      <div className="real-number-data">{requestAcceptedCounter}</div>
                  </div>
                </div>
               <div className="paired">
                <div className="analytical-icons55">
                      <div className="icon-and-title2"><CiTimer className="ecg"/><h3>Pending Requests</h3></div>
                      <div className="real-number-data">{requestPendingCounter}</div>
                  </div>
                  <div className="analytical-icons66">
                      <div className="icon-and-title2"><FiCheckCircle className="ecg"/><h3>Completed Requests</h3></div>
                      <div className="real-number-data">{requestCompletedCounter}</div>
                  </div>
               </div>
            </div>
          </div>
      </div>
      <div className="head-piechart-in-the-dashboardd">
          <div className="admin-piechart-holder-department111"><PieDepartment/></div> 
          <div className="admin-piechart-holder-department"><Staff/></div>           
          <div className="admin-piechart-holder-department"><RequestType/></div>

        </div>
        <div className="admin-piechart-holder-department"><PerformanceGraph/></div> 
    </div>
   );
}
 
export default Dashboard;
