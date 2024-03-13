import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowRequests.css"; // Import CSS file for styling

const CalibrationList = () => {
  const [calibrations, setCalibrations] = useState([]);

  useEffect(() => {
    fetchCalibrations();
  }, []);

  const fetchCalibrations = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/requestOptions/showRequests');
      setCalibrations(response.data);
    } catch (error) {
      console.error('Error fetching calibrations:', error);
    }
  };

  return (
    <div>
      <h2>Calibration List</h2>
      {calibrations.map((calibration) => (
        <div className="calibration-item" key={calibration.id}>
          <h3>{calibration.equipmentName}</h3>
          <p>Equipment Type: {calibration.equipmentType}</p>
          <p>Equipment Model: {calibration.equipmentModel}</p>
          <p>Department: {calibration.department}</p>
          <p>Reason: {calibration.reason}</p>
          <p>Calibration Type: {calibration.calibrationType}</p>
          <p>Due Date: {calibration.dueDate}</p>
          <p>Calibration Date: {calibration.calibrationDate}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CalibrationList;