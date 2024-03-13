import React, { useState } from 'react';
import axios from 'axios';
import './Training.css';
import EngineerSidebar from '../../EngineerSidebar';

const TrainingFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [department, setDepartment] = useState('');
  const [traineeType, setTraineeType] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
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

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleTraineeType = (e) => {
    setTraineeType(e.target.value);
  };

  const handleLevel = (e) => {
    setLevel(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleTrainingDate = (e) => {
    setTrainingDate(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !traineeType ||!level||
          !equipmentType||!model||!department||
          !description|| !duration ) {
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
          department,
          traineeType,
          level,
          description,
          duration,
          requestDate: formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/training', formData);
        alert('Training request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setModel('');
        setDepartment('');
        setTraineeType('');
        setLevel('');
        setDescription('');
        setDuration('');
        setTrainingDate('');
      }
    } catch (error) {
      console.error('Error submitting training request:', error);
    }
  };

  return (
    <div className="main-training">
      <div className="training-title">
        <EngineerSidebar />
        <h2 className="Training-Page">Training Form</h2>
      </div>
      <div className="training-form">
      <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="training-input"
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
            className="training-input"
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
            className="training-input"
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
            className="training-input"
            type="text"
            value={model}
            onChange={handleModel}
          />
        </div>
        
        <div className="individual">
          <label>Trainee Type*</label>
          <select
            className="training-input"
            value={traineeType}
            onChange={handleTraineeType}
          >
            <option value=""></option>
            <option value="User">End User Training</option>
            <option value="Technical ">Technical Personnel Training</option>
            
          </select>
        </div>
        <div className="individual">
          <label>Level*</label>
          <select
            className="training-input"
            value={level}
            onChange={handleLevel}
          >
            <option value=""></option>
            <option value="Basic">Basic</option>
            <option value="Advanced">Advanced</option>
            <option value="Refreshnment">Refreshnment</option>
          </select>
        </div>
        <div className="individual">
          <label>Description*</label>
          <textarea
            className="training-description-input"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div className="individual">
          <label>Duration*</label>
          <input
            className="training-input"
            type="text"
            value={duration}
            onChange={handleDuration}
          />
        </div>
      </div>

      <button className="submit-buttonTraining" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default TrainingFormEngineer;