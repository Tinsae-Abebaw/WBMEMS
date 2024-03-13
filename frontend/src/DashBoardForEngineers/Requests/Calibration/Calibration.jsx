import React, { useState } from "react";
import axios from "axios";
import './Calibration.css';
import EngineerSidebar from "../../EngineerSidebar";

const CalibrationFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [department, setDepartment] = useState('');
  const [reason, setReason] = useState('');
  const [calibrationType, setCalibrationType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const equipmentOptions = [
    'X-ray Machine',
    'Magnetic Resonance Imaging (MRI) Scanner',
    'Computed Tomography (CT) Scanner',
    'Ultrasound Machine',
    'Electrocardiogram (ECG or EKG) Machine',
    'Blood Pressure Monitor',
    'Ventilator',
    'Defibrillator',
    'Infusion Pump',
    'Anesthesia Machine',
    'Patient Monitor',
    'Pulse Oximeter',
    'Electroencephalogram (EEG) Machine',
    'Holter Monitor',
    'Surgical Light',
    'Operating Room Table',
    'Surgical Microscope',
    'Electrosurgical Unit',
    'Centrifuge',
    'Microscope',
    'Autoclave',
    'Blood Analyzer',
    'Wheelchair',
    'Crutches',
    'Walker',
    'Dental Chair',
    'Dental X-ray Machine',
    'Dental Drill',
    'Linear Accelerator (used in Radiation Therapy)',
    'Radiation Therapy Planning System',
    'Blood Glucose Meter',
    'Spirometer',
    'Ambulance Stretcher',
    'Patient Transfer Board',
    'Hospital Bed',
  ];

  const equipmentCategories = [
    'Diagnostic Equipment',
    'Life Support Equipment',
    'Surgical Equipment',
    'Laboratory Equipment',
    'Rehabilitation Equipment',
    'Dental Equipment',
    'Diagnostic Testing Equipment',
    'Patient Transport Equipment',
  ];

  const departments = [
    'Emergency Department (ED)',
    'Medical-Surgical Units',
    'Intensive Care Unit (ICU)',
    'Operating Room (OR)',
    'Labor and Delivery (L&D)',
    'Maternity Ward',
    'Pediatrics ',
    'Radiology Department',
    'Laboratory',
    'Pharmacy',
    'Physical Therapy Department',
    'Occupational Therapy Department',
    'Respiratory Therapy Department',
    'Cardiology Department',
    'Neurology Department',
    'Gastroenterology Department',
    'Endocrinology Department',
  ];


  const handleEquipmentName = (e) => {
    setEquipmentName(e.target.value);
  };

  const handleEquipmentType = (e) => {
    setEquipmentType(e.target.value);
  };

  const handleEquipmentModel = (e) => {
    setEquipmentModel(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleCalibrationType = (e) => {
    setCalibrationType(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName ||
         !reason || 
         !dueDate|| 
         !equipmentModel||
         !department
         ) {
        alert('Please fill all mandatory fields!');
      } else {
        const today = new Date();
      const formattedDate = today.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        
      });


        const formData = {
          equipmentName,
          equipmentType,
          equipmentModel,
          department,
          reason,
          calibrationType,
          dueDate,
          requestDate: formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
          
        };

        await axios.post('http://localhost:7000/api/requestOptions/calibration', formData);
        alert('Calibration request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setEquipmentModel('');
        setDepartment('');
        setReason('');
        setCalibrationType('');
        setDueDate('');
      }
    } catch (error) {
      console.error('Error submitting calibration request:', error);
    }
  };

  return (
    <div className="main-calibration">
      <div className="calibration-title"><EngineerSidebar /><h2 className="Calibration-Page">Calibration Form</h2></div>
      <div className="calibration-form">
        <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="calibration-input"
            required
            value={equipmentName}
            onChange={handleEquipmentName}
          >
            <option value="">Select Equipment</option>
        {equipmentOptions.map((equipment, index) => (
          <option key={index} value={equipment}>
            {equipment}
          </option>
        ))}
          </select>
        </div>
        <div className="individual">
          <label>Equipment Type*</label>
          <select
            className="calibration-input"
            required
            value={equipmentType}
            onChange={handleEquipmentType}
          >
             <option value="">Select Equipment Type</option>
            {equipmentCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
          </select>
        </div>
        <div className="individual">
          <label>Equipment Model*</label>
          <input
            className="calibration-input"
            type="text"
            value={equipmentModel}
            onChange={handleEquipmentModel}
          />
        </div>
        <div className="individual">
          <label>Department*</label>
          <select
            className="calibration-input"
            required
            value={department}
            onChange={handleDepartment}
          >
            <option value="">Select department</option>
        {departments.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
          </select>
        </div>
        <div className="individual">
         <label>Due Date</label>
          <input
            className="calibration-input"
            type="date"
            required
            value={dueDate}
            onChange={handleDueDate}
          />
        </div>
        
        <div className="individual">
          <label>Calibration Type</label>
          <select
            className="calibration-input"
            value={calibrationType}
            onChange={handleCalibrationType}
          >
            <option value=""></option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
          </select>
        </div>
        <div className="individual">
          <label>Reason</label>
          <textarea
            className="calibration-description-input"
            required
            value={reason}
            onChange={handleReason}
          />
        </div>
        
      </div>
      <div>
      <button className="submit-buttonCalibration" onClick={handleFormSubmit}>
        Submit Request
      </button>
      </div>

      
    </div>
  );
};

export default CalibrationFormEngineer;