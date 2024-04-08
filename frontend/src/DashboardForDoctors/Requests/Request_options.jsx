import React from "react";
import './Request_options.css';
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';
import DoctorSidebar from "../DoctorSidebar";


const Request_options = () => {
  return (
    <div className="main-class-request-options">
      <div className="right-part">
        <div className="the-navigation-main-class-requests-doc">
          <DoctorSidebar />
          <h2 className="the-request-title-doc">Make Requests</h2>
        </div>
        <div className="sub-class-requests-doc">
          <Link to="Procurement" className="my-link">
            <div className="procurementt-doc">
              <FaShoppingCart className="Request_options-icons-doc" />
              Procurement
            </div>
          </Link>
          <Link to="Calibration" className="my-link">
            <div className="calibrationn-doc">
              <IoNotificationsOutline className="Request_options-icons-doc" />
              Calibration 
            </div>
          </Link>
          <Link to="Maintenance" className="my-link">
            <div className="maintenancee-doc">
              <GrSchedule className="Request_options-icons-doc" />
              Maintenance
            </div>
          </Link>
          <Link to="Specification" className="my-link">
            <div className="specificationn-doc">
              <MdAssignment className="Request_options-icons-doc" />
              Specification
            </div>
          </Link>
          <Link to="Training" className="my-link">
            <div className="trainingg-doc">
              <FaChalkboardTeacher className="Request_options-icons-doc" />
              Training
            </div>
          </Link>
          <Link to="Installation" className="my-link">
            <div className="installationn-doc">
              <FaDownload  className="Request_options-icons-doc" />
              Installation
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Request_options;