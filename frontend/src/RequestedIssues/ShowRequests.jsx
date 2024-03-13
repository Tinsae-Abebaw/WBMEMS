import axios from "axios";
import React, { useEffect, useState } from "react";
import './ShowRequests.css';
import Home from "../pages/Home/Home";
import { useSelector } from 'react-redux';

const SortByRequestType = () => {
    const [RequestType, setRequestType] = useState('');
    const [handleRequest, setHandlerequest] = useState([]);
    const [idHolder, setIdHolder] = useState(false);
    const [users, setUsers] = useState([]);
    const [detailed, setDetailed] = useState(null);
    const { user } = useSelector(state => state.user);
    const [reportDetail,setReportDetail]=useState(null);

    const handleRequestType = (e) => {
        setRequestType(e.target.value);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                const response = await axios.get('http://localhost:7000/api/requestOptions/users');
                const modifiedUsers = response.data.map(user => ({
                    ...user,
                    fullName: `${user.name} ${user.lastName}`
                }));

                setUsers(modifiedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!RequestType) {
            defaultRequestList();
        } else if (RequestType) {
            handleGetRequestsByType();
        }
    }, [RequestType, idHolder]);

    const defaultRequestList = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/requestOptions');
            setHandlerequest(response.data.reverse());
            console.log('received:', response);
            console.log(user.occupation);
        } catch (error) {
            console.error('error fetching the request', error);
        }
    }

    const handleGetRequestsByType = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getByRequestType?requestType=${RequestType}`);
            setHandlerequest(response.data);
            console.log('received:', response);
        } catch (error) {
            console.error('error fetching the request', error);
        }
    };

    const handleAccept = async (id) => {
        try {
            await updateStatus(id, 'Accepted');
            console.log('Status updated successfully');
            setIdHolder(prevIdHolder => !prevIdHolder);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAction = async (id, assignedTo) => {
        try {
            await updateAction(id, assignedTo);
            console.log('Action updated successfully');
            setIdHolder((prevIdHolder) => !prevIdHolder);
        } catch (error) {
            console.error('Error updating action:', error);
        }
    };

    const updateAction = async (id, assignedTo) => {
        try {
            const response = await axios.put(`http://localhost:7000/api/requestOptions/action/${id}`, {
                action: assignedTo
            });
            console.log('action value', response.data.action);
            return response.data;
        } catch (error) {
            console.error('Error updating device status:', error);
            return null;
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:7000/api/requestOptions/${id}`, { status: newStatus });
            console.log('status value', response.data.status);
            return response.data;
        } catch (error) {
            console.error('Error updating request status:', error);
            return null;
        }
    };

    const getById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getById?id=${id}`);
            setDetailed(response.data.find(request => request.id === id));
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const getByIdReport = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/reportOptions/getById?id=${id}`);
            setReportDetail(response.data.find(report => report.id === id));
            console.log('mmm',response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleClose = () => {
        setDetailed(null);
    };
    const handleCloseReport = () => {
        setReportDetail(null);
      };

    const handleUserSelect = (id, userName) => {
        handleAction(id, userName);
    };
return (
<div className='show-request-body'>
    <div className="sort-by-requestType-main">
    <div className="home-and-sort-title"><Home /><h2>Request</h2></div>
    <div className="sort-and-main">
        <select className="sortt-by-request" required type='text' value={RequestType} onChange={handleRequestType}>
            <option value=""> All Requests</option>
            <option value="procurement">Procurement</option>
            <option value="calibration">Calibration</option>
            <option value="maintenance">Maintenance</option>
            <option value="specification">Specification</option>
            <option value="training">Training</option>
            <option value="installation">Installation</option>
        </select>
        <div className="sort-by-requestType-output">
            {handleRequest.map((RequestByType) => (
                <div className="request-whole-view" key={RequestByType.id}>
                        <div  onClick={() => getById(RequestByType.id)}>
                            <div className="header">
                                <strong> {RequestByType.requestType}</strong> <strong> {RequestByType.requestDate} </strong>
                            </div>
                            <div className="sort-by-requestType-desc">
                            <div className="body-item" key={RequestByType}>
                                    {Object.entries(RequestByType).map(([columnName, value]) => {
                                        if (columnName === 'equipmentName' || columnName === 'department' ) {
                                            return (
                                                <div className='department-color ' key={columnName}>
                                                        
                                                    {value}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                            </div>
                            <div className="footer">
                                <strong> Status: </strong><span className='status'> {RequestByType.status}</span><br/>
                                <strong> Assigned to: </strong>{RequestByType.action}<br/>
                                <strong>Requested by: </strong>{RequestByType.requestedBy}
                            </div>
                        </div>
                        <button
                            onClick={() => handleAccept(RequestByType.id)}
                            className={RequestByType.status === 'Pending' ? 'when-accept-button' : 'deleteButton'}
                        >
                            Accept
                        </button>
                        <button
                            onClick={()=>getByIdReport(RequestByType.id)}
                            className={RequestByType.status === 'Completed' ? 'viewReportButton' : 'deleteButton'}
                        >
                            View Report
                        </button>
                        
                        
                        {users.length > 0 && RequestByType.status==='Accepted'&& (
                            <select 
                                className="user-selecter"
                                onChange={(e) => handleUserSelect(RequestByType.id, e.target.value)}
                            >
                                <option value="None" selected>Select Enginner</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.fullName}>
                                        {user.fullName}
                                    </option>
                                ))}
                            </select>
                        )}
                    


                    </div>
                    
                
            ))}
        </div>
    </div>
</div>
{detailed && (
    <div className='detailed-view-1'>
        <div className='detail-description-detailed'>
            <div className='device-description-detailed'>
                
                    {Object.entries(detailed).map(([columnName, value]) => {
                        if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                            if (value != null) {
                                const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');

                                return (
                                    <div className="sort-by-request" key={columnName}>
                                        <div className="columnName">{formattedColumnName}</div>
                                        <div className='columnValue'>{value}</div>
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                
                
            </div>
            <button onClick={handleClose} className='detail-close-button1'>Close</button>
        </div>
    </div>
)}

{reportDetail && (
    <div className='detailed-view-1'>
        <div className='detail-description-detailed'>
            <div className='device-description-detailed'>
                
                    {Object.entries(reportDetail).map(([columnName, value]) => {
                        if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                            if (value != null) {
                                const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');

                                return (
                                    <div className="sort-by-request" key={columnName}>
                                        <div className="columnName">{formattedColumnName}</div>
                                        <div className='columnValue'>{value}</div>
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}    
            </div>
            <button onClick={handleCloseReport} className='detail-close-button1'>Close</button>
        </div>
    </div>
)}


</div>
);
}

export default SortByRequestType;
