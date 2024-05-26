import React, { useEffect, useState } from "react";
import AnalyticalData from "../Piecharts/AnalyticalData/AnalyticalData";
import Piechart from "../Piecharts/Status/Piechart";
import EquipmentByCost from "../Piecharts/EquipmentByCost/EquipmentByCost";
import PieDepartment from "../Piecharts/Department/pieDepartment";
import Clock from "../Clock/Clock";
import WorkOrderStatus from "../Piecharts/workorderstatus/WorkOrderStatus";
import Staff from "../Piecharts/Staff/Staff";
import RequestType from "../Piecharts/RequestType/RequestType";
import axios from "axios";
import DoctorSidebar from "./DoctorSidebar";
import './DoctorDashboard.css'

const DoctorDashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    if (user) {
      NotificationNumber();
    }
  }, [user]);

  useEffect(() => {
    console.log('Notification Count:', NotificationCount);
    console.log('User ID:', user?.id);
  }, [NotificationCount, user]);

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
      <div className="the-title-navigation-main-class-engineer">
        
        <div className="title-and">
           <DoctorSidebar/>
          <h2 className="the-navigation-title">Doctor Dashboard</h2>
        </div>
      </div>
      <div className="three-sections">
        <div className="analytical-data-and-charts">
          <div className="analytical-device-data">
            <div className="doooooo"></div>
            <AnalyticalData />
          </div>
          <div className="first-section-doughnuts">
            <div className="admin-piechart-holder-status">
              <Piechart />
            </div>
            <div className="admin-piechart-holder-department-cost">
              <EquipmentByCost />
            </div>
            <div className="admin-piechart-holder-department">
              <PieDepartment />
            </div>
          </div>
        </div>
        <div className="short-cuts">
          <Clock />
         
          <div>
            <WorkOrderStatus />
          </div>
        </div>
      </div>
      <div className="head-piechart-in-the-dashboardd">
        <div className="admin-piechart-holder-department">
          <Staff />
        </div>
        <div className="admin-piechart-holder-department">
          <RequestType />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
