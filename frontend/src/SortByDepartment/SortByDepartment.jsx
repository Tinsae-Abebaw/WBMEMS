import axios from "axios";
import React, { useEffect, useState } from "react";
import './SortByDepartment.css';
import Home from "../pages/Home/Home";

const SortByDepartment = () => {
    const [EquipmentDepartment, setEquipmentDepartment] = useState('');
    const [handleDevice, setHandleDevice] = useState([]);

    const handleEquipmentDepartment = (e) => {
        setEquipmentDepartment(e.target.value);
    };

    useEffect(() => {
        if(!EquipmentDepartment){
            defaultEquipmentList();
        }else{
            handleGetEquipmentsByDepartment();
        }
    }, [EquipmentDepartment]); // Empty dependency array means this useEffect runs only once when the component mounts

    const defaultEquipmentList = async()=>{
        try {
            const response = await axios.get('http://localhost:7000/api/deviceRegistration');
            if (response.status === 200) {
                const receiveDevice = response.data.map(device => ({
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
                setHandleDevice(receiveDevice.reverse());
                console.log('received:', receiveDevice);
            } else {
                console.log('Error fetching equipments');
            }

        } catch (error) {
            console.error('error fetching the device', error);
        }
    }
    
    
    
    const handleGetEquipmentsByDepartment = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/deviceRegistration/getByDepartment?equipmentDepartment=${EquipmentDepartment}`);
            if (response.status === 200) {
                const receiveDevice = response.data.map(device => ({
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
                setHandleDevice(receiveDevice);
                console.log('received:', receiveDevice);
            } else {
                console.log('Error fetching equipments');
            }

        } catch (error) {
            console.error('error fetching the device', error);
        }
    };

    return (
        <div className="sort-by-department-main">
            <div className="home-and-sort-title"><Home/><h2>Sort By Department</h2></div>
            <div className="select-and-body">
                <select className="sort-by-department-input" required type='text' value={EquipmentDepartment} onChange={handleEquipmentDepartment}>
                    <option value="">All Equipments</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Dietary/Nutrition">Dietary/Nutrition</option>
                    <option value="Administration/Management">Administration/Management</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Psychiatry">Psychiatry</option>
                </select>
                <div className="sort-by-department-output">
                    {handleDevice.map(DeviceByDepartment => (

                        <div key={DeviceByDepartment.id} className="device-by-department">
                            <img className='device-image' src={`http://localhost:7000/${DeviceByDepartment.equipmentImage}`} alt='Profile' />
                            <div className="sort-by-department-description">
                                <div className="sort-by-department">{DeviceByDepartment.equipmentName}</div>
                                <div className="sort-by-department">{DeviceByDepartment.equipmentDepartment}</div>
                                <div className="sort-by-department">{DeviceByDepartment.manufacturer}</div>
                            </div>
                        </div>


                    ))}
                </div>
            </div> 
     </div>
    );
}

export default SortByDepartment;
