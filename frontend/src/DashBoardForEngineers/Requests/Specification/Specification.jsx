import React, { useState } from 'react';
import axios from 'axios';
import './Specification.css';
import EngineerSidebar from '../../EngineerSidebar';

const SpecificationFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [specificationDate, setSpecificationDate] = useState('');
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

  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleManufacturer = (e) => {
    setManufacturer(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !dueDate||
          !equipmentType||
          !model||
          !serialNumber||
          !manufacturer||
          !department||
          !description
          
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
          model,
          serialNumber,
          manufacturer,
          department,
          description,
          dueDate,
          requestDate:formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/specification', formData);
        alert('Specification request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setModel('');
        setSerialNumber('');
        setManufacturer('');
        setDepartment('');
        setDescription('');
        setDueDate('');
        setSpecificationDate('');
      }
    } catch (error) {
      console.error('Error submitting specification request:', error);
    }
  };

  return (
    <div className="main-specification-request">
      <div className="specification-title-request">
        <EngineerSidebar/>
        <h2 className="Specification-Page-request1">Specification Form</h2>
      </div>
      <div className="specification-form-request">
      <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="specification-input"
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
            className="specification-input"
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
          <label>Model*</label>
          <input
            className="specification-input"
            type="text"
            value={model}
            onChange={handleModel}
          />
        </div>
        <div className="individual">
          <label>Serial Number*</label>
          <input
            className="specification-input"
            type="text"
            value={serialNumber}
            onChange={handleSerialNumber}
          />
        </div>
        <div className="individual">
          <label>Manufacturer*</label>
          <input
            className="specification-input"
            type="text"
            value={manufacturer}
            onChange={handleManufacturer}
          />
        </div>
        <div className="individual">
          <label>Department*</label>
          <select
            className="specification-input"
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
          <label>Description*</label>
          <textarea className="specification-description-input"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div className="individual">
          <label>Due Date*</label>
          <input
            className="specification-input"
            type="date"
            required
            value={dueDate}
            onChange={handleDueDate}
          />
        </div>
      </div>

      <button className="submit-buttonSpecification" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default SpecificationFormEngineer;