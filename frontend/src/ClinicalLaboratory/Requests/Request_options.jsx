import React from "react";
import './Request_options.css';
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';
import RadiologistSidebar from "../sidebar/Sidebar";
import LabSidebar from "../sidebar/Sidebar";

const Request_options_Lab = () => {
  return (
    <div className="main-class-request-options">
      <div className="right-part-rad">
        <div className="the-navigation-main-class-requestss-rad">
          <LabSidebar/>
          <h1 className="the-request-title">Make Requests</h1>
        </div>
        <div className="sub-class-requestss-rad">
          <Link to="Procurement" className="my-link">
            <div className="procurementt-rad">
              <FaShoppingCart className="Request_options-icons" />
              Procurement
            </div>
          </Link>
          <Link to="Calibration" className="my-link">
            <div className="calibrationn-rad">
              <IoNotificationsOutline className="Request_options-icons" />
              Calibration
            </div>
          </Link>
          <Link to="Maintenance" className="my-link">
            <div className="maintenancee-rad">
              <GrSchedule className="Request_options-icons" />
              Maintenance
            </div>
          </Link>
          <Link to="Specification" className="my-link">
            <div className="specificationn-rad">
              <MdAssignment className="Request_options-icons" />
              Specification
            </div>
          </Link>
          <Link to="Training" className="my-link">
            <div className="trainingg-rad">
              <FaChalkboardTeacher className="Request_options-icons" />
              Training
            </div>
          </Link>
          <Link to="Installation" className="my-link">
            <div className="installationn-rad">
              <FaDownload  className="Request_options-icons" />
              Installation
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Request_options_Lab;