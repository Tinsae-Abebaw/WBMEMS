import React, {useEffect, useState } from "react";
import axios from "axios";
import './Maintenance.css';
import EngineerSidebar from "../../EngineerSidebar";

const MaintenanceFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [department, setDepartment] = useState('');
  const[manufacturer,setManufacturer]= useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    // Fetch inventory data from backend API
    

    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      setInventoryData(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleEquipmentName = (e) => {
    const selectedEquipment = inventoryData.find(item => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setEquipmentName(selectedEquipment.equipmentName);
      setEquipmentModel(selectedEquipment.model);
      setDepartment(selectedEquipment.equipmentDepartment);
      setSerialNumber(selectedEquipment.serialNumber); // Update serial number
      setManufacturer(selectedEquipment.manufacturer);
    }
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
      if (!equipmentName || !issue || !dueDate || !equipmentModel || !department || !priority) {
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
          
          equipmentModel,
          department,
          manufacturer,
          issue,
          priority,
          dueDate,
          serialNumber, // Include serial number in the form data
          requestDate: formattedDate,
          requestedBy: `${user.name} ${user.lastName}`,
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
        setSerialNumber('');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    }
  };

  return (
    <div className="main-maintenance-request">
      <div className="maintenance-title">
        <EngineerSidebar />
        <h2 className="Maintenance-Page">Maintenance Form</h2>
      </div>
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
            {inventoryData.map((equipment, index) => (
              <option key={index} value={equipment.equipmentName}>
                {equipment.equipmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="individual">
          <label>Serial Number</label>
          <input
            className="maintenance-input"
            type="text"
            value={serialNumber}
            onChange={() => {}} // This field is readonly
            readOnly
          />
        </div>
      
        <div className="individual">
          <label>Department*</label>
          <input
            className="maintenance-input"
            type="text"
            value={department}
            onChange={() => {}} // This field is readonly
            readOnly
          />
        </div>
        <div className="individual">
          <label>Equipment Model*</label>
          <input
            className="maintenance-input"
            type="text"
            value={equipmentModel}
            onChange={() => {}} // This field is readonly
            readOnly
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

export default MaintenanceFormEngineer;