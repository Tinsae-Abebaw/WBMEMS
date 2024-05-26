



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './EngineerDeviceShow.css';
import { RiErrorWarningLine } from "react-icons/ri";
import EngineerSidebar from './EngineerSidebar';

const EngineerDeviceShow = () => {
  const [deviceOverview, setDeviceOverview] = useState([]);
  const [warning, setWarning] = useState(false);
  const [idHolder, setIdHolder] = useState(null);
  const [detailed, setDetailed] = useState(null);
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
          userManual: device.Manuals ? device.Manuals.userManual : null,
          serviceManual: device.Manuals ? device.Manuals.serviceManual : null
        }));
        setDeviceOverview(deviceInformation.reverse());
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleGetReportsBySerialNumber = async (serialNumber) => {
    try {
      const response = await axios.get(`http://localhost:7000/api/reportOptions/getBySerialNumber?serialNumber=${serialNumber}`);
      setHandleReport(response.data);
      console.log('Received data:', response.data);
    } catch (error) {
      console.error('Error fetching the report', error);
    }
  };

  const formatColumnName = (columnName) => {
    return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
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
  };

  const EraseNotifications = async () => {
    try {
      await axios.delete(`http://localhost:7000/api/alertAndNotification/notification?notificationType=NewDevice`);
    } catch (error) {
      console.error(error);
    }
  };

 const getById = async (id) => {
  try {
    console.log('id',id);
    const response = await axios.get(`http://localhost:7000/api/deviceRegistration/getById?id=${id}`);
    if (response.status === 200) {
      const device = response.data[0]; // Assuming the response is an array with one device object
      const detailedDevice = {
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
        userManual: null, // Initialize to null
        serviceManual: null // Initialize to null
      };
      console.log('id',device.serialNumber);
      // Fetch manuals using the serial number
      const manualsResponse = await axios.get(`http://localhost:7000/api/deviceRegistration/manuals?serialNumber=${device.serialNumber}`);
      if (manualsResponse.status === 200) {
        const { userManual, serviceManual } = manualsResponse.data;
        detailedDevice.userManual = userManual;
        detailedDevice.serviceManual = serviceManual;
      }
       


      setDetailed(detailedDevice);
    } else {
      throw new Error('Failed to fetch device');
    }
  } catch (error) {
    console.error('Error fetching device:', error);
  }
};


  const handleClose = () => {
    setDetailed(null);
  };

  const handleExportDocuments = async (serialNumber) => {
    try {
      console.log('serial',serialNumber);
      const response = await axios.get(`http://localhost:7000/api/deviceRegistration/manuals?serialNumber=${serialNumber}`);
      const { userManual, serviceManual } = response.data;
  

      const zip = new JSZip();

      if (userManual) {
        const userManualResponse = await axios.get(`http://localhost:7000/api/deviceRegistration/userManuals/download/${userManual}`, { responseType: 'blob' });
        zip.file('UserManual.pdf', userManualResponse.data);
      }

      if (serviceManual) {
        const serviceManualResponse = await axios.get(`http://localhost:7000/api/deviceRegistration/serviceManuals/download/${serviceManual}`, { responseType: 'blob' });
        zip.file('ServiceManual.pdf', serviceManualResponse.data);
      }
       
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${serialNumber}_manuals.zip`);
    } catch (error) {
      console.error('Error exporting documents:', error);
    }
  };

  return (
    <div className='cc'>
      {warning && (
        <div className='alert-main'>
          <div className='dispose-warning-alert'>
            <RiErrorWarningLine className='warning-icon' />
            <div>Are you sure you want to dispose of the device?</div>
            <div className='dispose-alert-buttons'>
              <button className='dispose-alert-button-yes' onClick={() => updateStatus(idHolder, 'Disposed')}>Yes</button>
              <button className='dispose-alert-button-cancel' onClick={() => setWarning(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className='grand-device'>
        <div className='device-main-head'>
          <div><EngineerSidebar/></div>
          <h2>Equipment Information</h2>
        </div>
        <div className='device-table'>
          {deviceOverview.map((device) => (
            <div key={device.id}>
              <div className='individual-device' onClick={() => getById(device.id)}>
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
                <button className='open-maintenance-button-head' onClick={() => {
                  setHistory(true);
                  handleGetReportsBySerialNumber(device.serialNumber);
                }}>Maint. Hist.</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {history && handleReport.length > 0 && (
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
          <button className='specific-Device-History-report-button' onClick={() => {
            setHistory(false);
          }}>Close</button>
        </div>
      )}
      {detailed && (
        <div className='detailed-view-2'>
          <div className='detail-description-head'>
            <div className='device-profile-picture'>
              <img className='main-device-image' src={`http://localhost:7000/${detailed.equipmentImage}`} alt='Profile' />
              <div><p className='device-manufacturer'><p className='detail-title'>Description</p>{detailed.equipmentDescription}</p></div>
            </div>
            <div>
              <div className='de-device-description'>
                <p className='device-manufacturer'><p className='detail-title'>Equipment Name</p>{detailed.equipmentName}</p>
                <p className='device-manufacturer'><p className='detail-title'>Equipment Model</p>{detailed.model}</p>
                <p className='device-manufacturer'><p className='detail-title'>Manufacturer</p>{detailed.manufacturer}</p>
                <p className='device-manufacturer'><p className='detail-title'>Country of Origin</p>{detailed.countryOfOrigin}</p>
                <p className='device-manufacturer'><p className='detail-title'>Warranty Expiry Date</p>{detailed.warrantyExpiryDate}</p>
                <p className='device-manufacturer'><p className='detail-title'>Status</p>{detailed.status}</p>
                {detailed.userManual ? (
                      <p className='device-manufacturer'>
                        <p className='detail-title'>User Manual</p>
                        <a href={`http://localhost:7000/${detailed.userManual}`} target="_blank" rel="noopener noreferrer">Download User Manual</a>
                      </p>
                    ) : (
                      <p className='device-manufacturer'>
                        <p className='detail-title'>User Manual</p>
                        No
                      </p>
                    )}

                    {detailed.serviceManual ? (
                      <p className='device-manufacturer'>
                        <p className='detail-title'>Service Manual</p>
                        <a href={`http://localhost:7000/${detailed.serviceManual}`} target="_blank" rel="noopener noreferrer">Download Service Manual</a>
                      </p>
                    ) : (
                      <p className='device-manufacturer'>
                        <p className='detail-title'>Service Manual</p>
                        No 
                      </p>
                    )}

              </div>
              <button onClick={handleClose} className='detail-close-button-head'>Close</button>
                            { (detailed.userManual || detailed.serviceManual) && (
                <button onClick={() => handleExportDocuments(detailed.serialNumber)} className='export-document-button'>Export Documents</button>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerDeviceShow;
