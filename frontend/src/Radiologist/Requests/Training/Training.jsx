
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Training.css';
import RadiologistSidebar from '../../sidebar/Sidebar';

const RadiologistTrainingForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const [department, setDepartment] = useState('');
  const [traineeType, setTraineeType] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEquipmentName = (e) => {
    const selectedEquipment = inventory.find((item) => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setEquipmentName(selectedEquipment.equipmentName);
      setModel(selectedEquipment.model);
      setDepartment(selectedEquipment.equipmentDepartment); // Set department based on selected equipment
      setSerialNumber(selectedEquipment.serialNumber);
      setManufacturer(selectedEquipment.manufacturer);
    }
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

  const handleFormSubmit = async () => {
    try {
      if (
        !equipmentName ||
        !traineeType ||
        !level ||
        
        !model ||
        !department ||
        !description ||
        !duration
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
          manufacturer,
          model,
          serialNumber,
          department,
          traineeType,
          level,
          description,
          duration,
           // Add serialNumber to formData
          requestedBy: `${user.name} ${user.lastName}`,
          requestDate: formattedDate,
        };

        await axios.post('http://localhost:7000/api/requestOptions/training', formData);
        alert('Training request submitted successfully');

        // Reset form fields after submission
        setEquipmentName('');
        setManufacturer('');
        setModel('');
        setDepartment('');
        setTraineeType('');
        setLevel('');
        setDescription('');
        setDuration('');
        setSerialNumber('');
      }
    } catch (error) {
      console.error('Error submitting training request:', error);
    }
  };

  return (
    <div className="main-training">
      <div className="training-title">
        <RadiologistSidebar />
        <h2 className="Training-Page">Training Request Form</h2>
      </div>
      <div className="training-formm-rad">
        <div className="individualll-radio">
          <label>Equipment Name*</label>
          <select
            className="training-inputt"
            required
            value={equipmentName}
            onChange={handleEquipmentName}
          >
            <option value="">Select Equipment</option>
            {inventory.map((item, index) => (
              <option key={index} value={item.equipmentName}>
                {item.equipmentName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="individualll-radio">
          <label>Department*</label>
          <input
            className="training-inputt"
            type="text"
            value={department}
            readOnly // Assuming department is not editable
          />
        </div>
        <div className="individualll-radio">
          <label>Model*</label>
          <input
            className="training-inputt"
            type="text"
            value={model}
            onChange={handleModel}
            readOnly // Assuming equipment model is not editable
          />
        </div>
        <div className="individualll-radio">
          <label>Serial Number*</label>
          <input
            className="training-inputt"
            type="text"
            value={serialNumber}
            readOnly // Assuming serial number is not editable
          />
        </div>
        <div className="individualll-radio">
          <label>Trainee Type*</label>
          <select
            className="training-inputt"
            value={traineeType}
            onChange={handleTraineeType}
          >
            <option value=""></option>
            <option value="User">End User Training</option>
            <option value="Technical">Technical Personnel Training</option>
          </select>
        </div>
        <div className="individualll-radio">
          <label>Level*</label>
          <select
            className="training-inputt"
            value={level}
            onChange={handleLevel}
          >
            <option value=""></option>
            <option value="Basic">Basic</option>
            <option value="Advanced">Advanced</option>
            <option value="Refreshment">Refreshment</option>
          </select>
        </div>
        
        <div className="individualll-radio">
          <label>Duration*</label>
          <input
            className="training-inputt"
            type="text"
            value={duration}
            onChange={handleDuration}
          />
        </div>
        <div className="individualll-radio">
          <label>Description*</label>
          <textarea
            className="training-description-inputt"
            value={description}
            onChange={handleDescription}
          />
        </div>
      </div>

      <button className="submit-buttonTraining" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default RadiologistTrainingForm;