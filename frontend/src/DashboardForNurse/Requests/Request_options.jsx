import React from "react";
import './Request_options.css';
import { FaShoppingCart } from "react-icons/fa"; // Procurement
import { IoNotificationsOutline } from "react-icons/io5"; // Calibration
import { GrSchedule } from "react-icons/gr"; // Maintenance
import { MdAssignment } from "react-icons/md"; // Specification
import { FaChalkboardTeacher } from "react-icons/fa"; // Training
import { Link } from "react-router-dom";
import { FaDownload } from 'react-icons/fa';
import NurseSidebar from "../NurseSidebar";


const Request_optionsNurse = () => {
  return (
    <div className="main-class-request-options">
      <div className="right-part">
        <div className="the-navigation-main-class-requestss">
          <NurseSidebar/>
          <h2 className="the-request-title">Make Requests</h2>
        </div>
        <div className="sub-class-requestss">
          <Link to="Procurement" className="my-link">
            <div className="procurementt">
              <FaShoppingCart className="Request_options-icons" />
              Procurement
            </div>
          </Link>
          <Link to="Calibration" className="my-link">
            <div className="calibrationn">
              <IoNotificationsOutline className="Request_options-icons" />
              Calibration
            </div>
          </Link>
          <Link to="Maintenance" className="my-link">
            <div className="maintenancee">
              <GrSchedule className="Request_options-icons" />
              Maintenance
            </div>
          </Link>
          <Link to="Specification" className="my-link">
            <div className="specificationn">
              <MdAssignment className="Request_options-icons" />
              Specification
            </div>
          </Link>
          <Link to="Training" className="my-link">
            <div className="trainingg">
              <FaChalkboardTeacher className="Request_options-icons" />
              Training
            </div>
          </Link>
          <Link to="Installation" className="my-link">
            <div className="installationn">
              <FaDownload  className="Request_options-icons" />
              Installation
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Request_optionsNurse;