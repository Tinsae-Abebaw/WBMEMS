
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorSidebar from '../../DoctorSidebar';
import './Specification.css';

const SpecificationForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [specificationDate, setSpecificationDate] = useState('');
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

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
      setSerialNumber(selectedEquipment.serialNumber);
      setDepartment(selectedEquipment.equipmentDepartment); // Set department based on selected equipment
      setManufacturer(selectedEquipment.manufacturer);
    }
  };

  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
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
      if (
        !equipmentName ||
        !model ||
        !serialNumber ||
        
        !department ||
        !description ||
        !dueDate
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
          
          model,
          serialNumber,
          department,
          description,
          dueDate,
          requestDate: formattedDate,
          requestedBy: `${user.name} ${user.lastName}`,
          manufacturer,
        };

        await axios.post('http://localhost:7000/api/requestOptions/specification', formData);
        alert('Specification request submitted successfully');

        // Reset form fields after submission
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
        <DoctorSidebar />
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
            {inventory.map((item, index) => (
              <option key={index} value={item.equipmentName}>
                {item.equipmentName}
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
            readOnly // Assuming equipment model is not editable
          />
        </div>
        <div className="individual">
          <label>Serial Number*</label>
          <input
            className="specification-input"
            type="text"
            value={serialNumber}
            onChange={handleSerialNumber}
            readOnly // Assuming equipment model is not editable
          />
        </div>
        <div className="individual">
          <label>Department*</label>
          <input
            className="specification-input"
            type="text"
            value={department}
            onChange={handleDepartment}
            readOnly // Assuming equipment model is not editable
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
        <div className="individual">
          <label>Description*</label>
          <textarea
            className="specification-description-input"
            value={description}
            onChange={handleDescription}
          />
        </div>
        
      </div>

      <button className="submit-buttonSpecification" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default SpecificationForm;