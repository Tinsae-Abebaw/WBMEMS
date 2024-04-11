import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeviceOverview.css';
import Home from '../pages/Home/Home';
import { RiErrorWarningLine } from "react-icons/ri";


const DeviceOverview = () => {
  const [deviceOverview, setDeviceOverview] = useState([]);
  const [warning, setWarning] = useState(false);
  const [idHolder, setIdHolder] = useState(null);
  const [detailed, setDetailed] = useState(null); // Changed state name to lowercase "detailed"
  const [history, setHistory] = useState(false);
  const [handleReport, setHandleReport] = useState([]);
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

/////////////////////////////////////////////////////
  const handleGetReportsBySerialNumber = async (serialNumber) => {
    try {
        const response = await axios.get(`http://localhost:7000/api/reportOptions/getBySerialNumber?serialNumber=${serialNumber}`);
        setHandleReport(response.data);
        console.log('received doooooo:', response.data);
    } catch (error) {
        console.error('error fetching the report', error);
    }
};

const formatColumnName = (columnName) => {
  return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
};
const desiredColumns = ['equipmentName', 'Model', 'department', 'reportType', 'doneBy', 'reportDate', 'replacementCostInETB', 'durationInHours'];
/////////////////////////////////////////
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:7000/api/deviceRegistration/${id}`, { status: newStatus });
      setWarning(false);
      return response.data;
    } catch (error) {
      console.error('Error updating device status:', error);
      return null;
    }
  };
  const EraseNotifications = async()=>{
    try{
      await axios.delete(`http://localhost:7000/api/alertAndNotification/notification?notificationType=${'NewDevice'}`);
    }catch(error){
      console.error(error)
    }
  
   }

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
        <div className='grand-device'>
          <div className='device-main-head'>
            <div><Home/></div>
            <h2>Equipment Information</h2>
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
                      <p className='device-name'>{device.equipmentName} <div className='main-spot-light'><div className='spot-light-admin'>.</div></div></p>
                      <p className='device-model'>{device.model}</p>
                      <p className='device-manuf'>{device.manufacturer}</p>
                    </div>
                    
                  </div>
                </div>
                <div className='the-two-inventory-buttons'>
                <button onClick={() => {
                      setWarning(true);
                      setIdHolder(device.id);
                    }} className='dispose-button-head'>Dispose</button>
                    <button className='open-maintenance-button-head' onClick={()=>{
                      setHistory(true);
                      handleGetReportsBySerialNumber(device.serialNumber);
                      console.log('the serial number',device.serialNumber);
                    }}>Maint. Hist.</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )};
      {history && handleReport.length >0 &&(
        <div className='specific-Device-History-reportt'>
          <div className="specific-Device-History-report-grid">
            <h2 className='maint-hist'>Maintenance History</h2>
            {handleReport.map((report, index) => (
              <div className="grid-item" key={index}>
                {Object.keys(report).map((columnName, colIndex) => {
                  const value = report[columnName];
                  if (value !== null) {
                    return (
                      <div className="grid-item-cell" key={colIndex}>
                        <div className="grid-item-cell-label">{formatColumnName(columnName)}</div>
                        <div className="grid-item-cell-value">{value}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
          <button className='specific-Device-History-report-button' onClick={()=>{
            setHistory(false);
          }}>Close</button>
        </div>
      )};

      {detailed && (
        <div className='detailed-view-2'>
          <div className='detail-description-head'>
            <div className='device-profile-picture'>
              <img className='main-device-image' src={`http://localhost:7000/${detailed.equipmentImage}`} alt='Profile' />
              <div><p className='device-manufacturer'><p className='detail-title'>Description </p> {detailed.equipmentDescription}</p></div>
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
              <button onClick={handleClose} className='detail-close-button-head'>Close</button>
            </div>
            </div>
          </div>
       
      )}
    </div>
  );
  }
export default DeviceOverview;
