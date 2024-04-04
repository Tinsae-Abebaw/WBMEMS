import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NurseDeviceShow.css';
import { RiErrorWarningLine } from "react-icons/ri";
import NurseSidebar from './NurseSidebar';


const NurseDeviceOverview = () => {
  const [deviceOverview, setDeviceOverview] = useState([]);
  const [warning, setWarning] = useState(false);
  const [idHolder, setIdHolder] = useState(null);
  const [detailed, setDetailed] = useState(null); // Changed state name to lowercase "detailed"

  useEffect(() => {
    fetchDeviceOverview();
    EraseNotifications();
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
    try {
      const response = await axios.put(`http://localhost:7000/api/deviceRegistration/${id}`, { status: newStatus });
      setWarning(false);
      return response.data;
    } catch (error) {
      console.error('Error updating device status:', error);
      return null;
    }
    setWarning(false);
    
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
  const EraseNotifications = async()=>{
    try{
      await axios.delete(`http://localhost:7000/api/alertAndNotification/notification?notificationType=${'NewDevice'}`);
    }catch(error){
      console.error(error)
    }
  
   }

  const handleClose = () => {
    setDetailed(null); // Reset detailed view when close button is clicked
  };

  return (
    <div className='cc-doctor'>
      {warning && (
        <div className='alert-main'>
          <div className='dispose-warning-alert'>
          <RiErrorWarningLine className='warning-icon'/>
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
        <div className='grand-device-doctor'>
          <div className='device-main-doctor'>
            <div><NurseSidebar/></div>
            <h2>Device Information</h2>
          </div>
          <div className='device-table-doc'>
            {deviceOverview.map((device) => (
              <div>
                <div className='individual-device-doctor' key={device.id} onClick={() => getById(device.id)}>
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
               </div>
            ))}
          </div>
        </div>
      )};
      {detailed && (
        <div className='detailed-view-2'>
          <div className='detail-description'>
            <div className='device-profile-picture'>
              <img className='main-device-image' src={`http://localhost:7000/${detailed.equipmentImage}`} alt='Profile' />
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
export default NurseDeviceOverview;
