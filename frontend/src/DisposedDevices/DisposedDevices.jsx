import axios from "axios";
import React, { useEffect, useState } from "react";
import './DisposedDevices.css';
import Home from "../pages/Home/Home";


const DisposedDevices = () => {
useEffect(()=>{
    handleDisposed();
}, []);

    const [disposedDevices, setDisposedDevices] = useState([]);
    const handleDisposed =async()=>{
        try{
            const response = await axios.get('http://localhost:7000/api/deviceRegistration/disposed')
            if(response.status ===200){
               const disposeds = response.data.map(disposed=>({
                   id: disposed.id,
                   equipmentName: disposed.equipmentName,
                   serialNumber: disposed.serialNumber,
                   equipmentDepartment: disposed.equipmentDepartment,
                   model: disposed.model,
                   manufacturer: disposed.manufacturer,
                   equipmentDescription: disposed.equipmentDescription,
                   maintenanceHistory: disposed.maintenanceHistory,
                   countryOfOrigin: disposed.countryOfOrigin,
                   warrantyExpiryDate: disposed.warrantyExpiryDate,
                   equipmentImage: disposed.equipmentImage,
                   status: disposed.status
               }));
               setDisposedDevices(disposeds.reverse());
            }else {
               throw new Error('Failed to fetch devices');
            }
        }
        catch(error){
            console.error('Error fetching devices:', error);
        };
       
    };
    return ( 
        <div className="disposed-grand-device">
            <div className="disposed-devicemain"><div className="invent"><Home/><h2>Disposed Devices</h2></div></div>
            <div className="disposed-main-grid">
            {disposedDevices.map((deviceDisposed) =>(
                    <div className="disposed-individual-device" key={deviceDisposed.id}>
                        <div className='disposed-device-profile-picture'>
                            <img className='disposed-device-image' src={`http://localhost:7000/${deviceDisposed.equipmentImage}`} alt='Profile' />
                        </div>
                        <div className='disposed-device-description'>
                            <div>
                            <p className='disposed-device-name'>{deviceDisposed.equipmentName} </p>
                            <p className='disposed-device-model'>{deviceDisposed.model}</p>
                            <p className='disposed-device-manufacturer'>{deviceDisposed.manufacturer}</p>
                            </div>
                        </div>
                    </div>
             
            ))}
            </div>
        </div>
     );
}
 
export default DisposedDevices;