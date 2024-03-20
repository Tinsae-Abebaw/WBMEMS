import React, { useEffect,useState } from "react";
import axios from "axios";
import './Calibration.css';
import EngineerSidebar from "../../EngineerSidebar";

const CalibrationFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [department, setDepartment] = useState('');
  const[manufacturer,setManufacturer]= useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [calibrationReason, setCalibrationReason] = useState('');
  const [calibrationType, setCalibrationType] = useState('');
  const [calibrationDueDate,setCalibrationDueDate ] = useState('');
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    
    fetchInventory();
  }, []); // Fetch inventory on component mount

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEquipmentName = (e) => {
    const selectedEquipment = inventory.find(item => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setEquipmentName(selectedEquipment.equipmentName);
      setEquipmentModel(selectedEquipment.model);
      setDepartment(selectedEquipment.equipmentDepartment);
      setSerialNumber(selectedEquipment.serialNumber);
      setManufacturer(selectedEquipment.manufacturer);
    }
  };

  const handleReason = (e) => {
    setCalibrationReason(e.target.value);
  };

  const handleCalibrationType = (e) => {
    setCalibrationType(e.target.value);
  };

  

  const handleDueDate = (e) => {
    setCalibrationDueDate (e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !calibrationReason || !calibrationDueDate || !equipmentModel || !department || !serialNumber) {
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
          serialNumber,
          calibrationReason,
          calibrationType,
          calibrationDueDate,
          requestDate: formattedDate,
          requestedBy: `${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/calibration', formData);
        alert('Calibration request submitted successfully');

        // Reset form fields after submission
        setEquipmentName('');
        
        setEquipmentModel('');
        setDepartment('');
        setSerialNumber('');
        setCalibrationReason('');
        setCalibrationType('');
        setCalibrationDueDate('');
      }
    } catch (error) {
      console.error('Error submitting calibration request:', error);
    }
  };

  return (
    <div className="main-calibration">
      <div className="calibration-title">
        <EngineerSidebar/>
        <h2 className="Calibration-Page">Calibration Form</h2>
      </div>
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
            {inventory.map((item, index) => (
              <option key={index} value={item.equipmentName}>
                {item.equipmentName}
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
            onChange={() => {}} // Equipment model is populated based on selected equipment
            readOnly // Assuming equipment model is not editable
          />
        </div>
        <div className="individual">
          <label>Department*</label>
          <input
            className="calibration-input"
            type="text"
            value={department}
            onChange={() => {}} // Department is populated based on selected equipment
            readOnly // Assuming department is not editable
          />
        </div>
        <div className="individual">
          <label>Serial Number*</label>
          <input
            className="calibration-input"
            type="text"
            value={serialNumber}
            onChange={() => {}} // Serial number is populated based on selected equipment
            readOnly // Assuming equipment model is not editable// Assuming serial number is not editable
          />
        </div>
        <div className="individual">
          <label>Due Date</label>
          <input
            className="calibration-input"
            type="date"
            required
            value={calibrationDueDate }
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
            value={calibrationReason}
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