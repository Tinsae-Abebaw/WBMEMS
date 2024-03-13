import React, { useState } from 'react';
import axios from 'axios';
import './Installation.css';
import DoctorSidebar from '../../DoctorSidebar';

const InstallationForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [department, setDepartment] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [specification, setSpecification] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  
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

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleSpecification = (e) => {
    setSpecification(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !department || 
         !model || !serialNumber||!description) {
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
          department,
          model,
          serialNumber,
          specification,
          dueDate,
          description,
          requestDate: formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/installation', formData);
        alert('Installation request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setDepartment('');
        setModel('');
        setSerialNumber('');
        setSpecification('');
        setDueDate('');
        setDescription('');
        setInstallationDate('');
      }
    } catch (error) {
      console.error('Error submitting installation request:', error);
    }
  };

  return (
    <div className="main-installation">
      <div className="installation-title">
        <DoctorSidebar />
        <h2 className="Installation-Page">Installation Form</h2>
      </div>
      <div className="installation-form">
        <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="installation-input"
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
            className="installation-input"
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
            className="installation-input"
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
          <label>Model*</label>
          <input
            className="installation-input"
            type="text"
            value={model}
            onChange={handleModel}
          />
        </div>
        <div className="individual">
          <label>Serial Number*</label>
          <input
            className="installation-input"
            type="text"
            value={serialNumber}
            onChange={handleSerialNumber}
          />
        </div>
        <div className="individual">
          <label>Due Date</label>
          <input
            className="installation-input"
            type="date"
            required
            value={dueDate}
            onChange={handleDueDate}
          />
        </div>
        <div className="individual">
          <label>Specification</label>
          <textarea
            className="installation-description-input "
            value={specification}
            onChange={handleSpecification}
          />
        </div>
        
        <div className="individual">
          <label>Description*</label>
          <textarea
            className="installation-description-input "
            value={description}
            onChange={handleDescription}
          />
        </div>
      </div>

      <button className="submit-buttonInstallation" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default InstallationForm;