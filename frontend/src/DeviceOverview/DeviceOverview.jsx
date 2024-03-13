import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeviceOverview.css';
import Home from '../pages/Home/Home';

const DeviceOverview = () => {
  const [deviceOverview, setDeviceOverview] = useState([]);
  const [warning, setWarning] = useState(false);
  const [idHolder, setIdHolder] = useState(null);
  const [detailed, setDetailed] = useState(null); // Changed state name to lowercase "detailed"

  useEffect(() => {
    fetchDeviceOverview();
  }, [warning]);

  const fetchDeviceOverview = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/deviceRegistration');
      if (response.status === 200) {
        const deviceInformation = response.data.map(device => ({
          id: device.id,
          equipmentName: device.equipmentName,
          serialNumber: device.serialNumber,
          equipmentDepartment: device.equipmentDepartment,
          model: device.model,
          manufacturer: device.manufacturer,
          equipmentDescription: device.equipmentDescription,
          maintenanceHistory: device.maintenanceHistory,
          countryOfOrigin: device.countryOfOrigin,
          warrantyExpiryDate: device.warrantyExpiryDate,
          equipmentImage: device.equipmentImage,
          status: device.status,
        }));
        setDeviceOverview(deviceInformation.reverse());
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setWarning(false);
    try {
      const response = await axios.put(`http://localhost:7000/api/deviceRegistration/${id}`, { status: newStatus });
      return response.data;
    } catch (error) {
      console.error('Error updating device status:', error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:7000/api/deviceRegistration?id=${id}`);
      if (response.status === 200) {
        const deviceInformation = response.data.map(device => ({
          id: device.id,
          equipmentName: device.equipmentName,
          serialNumber: device.serialNumber,
          equipmentDepartment: device.equipmentDepartment,
          model: device.model,
          manufacturer: device.manufacturer,
          equipmentDescription: device.equipmentDescription,
          maintenanceHistory: device.maintenanceHistory,
          countryOfOrigin: device.countryOfOrigin,
          warrantyExpiryDate: device.warrantyExpiryDate,
          equipmentImage: device.equipmentImage,
          status: device.status,
        }));
        setDetailed(deviceInformation.find(device => device.id === id)); // Only set detailed view for the clicked element
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleClose = () => {
    setDetailed(null); // Reset detailed view when close button is clicked
  };

  return (
    <div className='cc'>
      {warning && (
        <div className='alert-main'>
          <div className='dispose-warning-alert'>
            <div>Are you sure you want to dispose the device! ?</div>
            <div className='dispose-alert-buttons'>
              <button className='dispose-alert-button-yes' onClick={() => updateStatus(idHolder, 'Disposed')}>Yes</button>
              <button className='dispose-alert-button-cancel' onClick={() => setWarning(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )
}
       {(
        <div className='grand-device'>
          <div className='device-main'>
            <div><Home/></div>
            <h2>Device Information</h2>
          </div>
          <div className='device-table'>
            {deviceOverview.map((device) => (
              <div>
                <div className='individual-device' key={device.id} onClick={() => getById(device.id)}>
                  <div className='device-profile-picture'>
                    <img className='device-image' src={`http://localhost:7000/${device.equipmentImage}`} alt='Profile' />
                  </div>
                  <div className='device-description'>
                    <div>
                      <p className='device-name'>{device.equipmentName} <div className='spot-light'>.</div></p>
                      <p className='device-model'>{device.model}</p>
                      <p className='device-manuf'>{device.manufacturer}</p>
                    </div>
                    
                  </div>
                </div>
                <button onClick={() => {
                      setWarning(true);
                      setIdHolder(device.id);
                    }} className='dispose-button'>Dispose</button>
              </div>
            ))}
          </div>
        </div>
      )};
      {detailed && (
        <div className='detailed-view-2'>
          <div className='detail-description'>
            <div className='device-profile-picture'>
              <img className='device-image' src={`http://localhost:7000/${detailed.equipmentImage}`} alt='Profile' />
            </div>
            <div >
              <div className='de-device-description'>
                  <p className='device-manufacturer'><p className='detail-title'>Equipment Name</p>{detailed.equipmentName}</p>
                  <p className='device-manufacturer'><p className='detail-title'>Equipment Model</p>{detailed.model}</p>
                  <p className='device-manufacturer'><p className='detail-title'>Manufacturer</p> {detailed.manufacturer}</p>
                  <p className='device-manufacturer'><p className='detail-title'>Country of Origin </p> {detailed.countryOfOrigin}</p>
                  <p className='device-manufacturer'><p className='detail-title'>Warranty Expiry Date</p> {detailed.warrantyExpiryDate}</p>
                  <p className='device-manufacturer'><p className='detail-title'>Status </p> {detailed.status}</p>
              </div>
                <div><p className='device-manufacturer'><p className='detail-title'>Description </p> {detailed.equipmentDescription}</p></div>
            </div>

              <button onClick={handleClose} className='detail-close-button'>Close</button>
            </div>
          </div>
       
      )}
    </div>
  );
  }
export default DeviceOverview;
