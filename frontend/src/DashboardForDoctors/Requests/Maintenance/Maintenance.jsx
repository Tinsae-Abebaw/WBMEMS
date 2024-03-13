import React, { useState } from "react";
import axios from "axios";
import './Maintenance.css';
import DoctorSidebar from "../../DoctorSidebar";

const MaintenanceForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [department, setDepartment] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('');
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

  const handleIssue = (e) => {
    setIssue(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !issue || !dueDate||
        !equipmentModel||
        !department||
        !issue||
        !priority
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
          issue,
          priority,
          dueDate,
          requestDate: formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/maintenance', formData);
        alert('Maintenance request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setEquipmentModel('');
        setDepartment('');
        setIssue('');
        setPriority('');
        setDueDate('');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    }
  };

  return (
    <div className="main-maintenance-request">
      <div className="maintenance-title"><DoctorSidebar/><h2 className="Maintenance-Page">Maintenance Form</h2></div>
      <div className="maintenance-form-request">
      <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="maintenance-input"
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
            className="maintenance-input"
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
          <label>Department*</label>
          <select
            className="maintenance-input"
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
          <label>Equipment Model*</label>
          <input
            className="maintenance-input"
            type="text"
            value={equipmentModel}
            onChange={handleEquipmentModel}
          />
        </div>
        <div className="individual">
          <label>Priority*</label>
          <select
            className="maintenance-input"
            value={priority}
            onChange={handlePriority}
          >
            <option value=""></option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="individual">
         <label>Due Date*</label>
          <input
            className="maintenance-input"
            type="date"
            required
            value={dueDate}
            onChange={handleDueDate}
          />
        </div>
        <div className="individual">
          <label>Issue*</label>
          <textarea
            className="maintenance-description-input"
            required
            value={issue}
            onChange={handleIssue}
          />
        </div>
        
      </div>
      <div>
        <button className="submit-buttonMaintenance" onClick={handleFormSubmit}>
        Submit Request
      </button>
      </div>
      
    </div>
  );
};

export default MaintenanceForm;