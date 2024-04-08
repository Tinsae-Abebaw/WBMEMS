import axios from "axios";
import React, { useEffect, useState } from "react";
import './TrackChanges.css';

import EngineerSidebar from "../EngineerSidebar";

const EngineerTrackChanges = () => {
    const [handleRequest, setHandlerequest] = useState([]);
    const [idHolder, setIdHolder] = useState(false);
    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage on component mount
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [detailed, setDetailed] = useState(null);

    useEffect(() => {
        defaultRequestList();
    }, [idHolder]);

    const defaultRequestList = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/trackchanges?fullName=${user.name} ${user.lastName}`);
            setHandlerequest(response.data.reverse());
        } catch (error) {
            console.error('Error fetching the requests:', error);
        }
    }
    
    const getById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getById?id=${id}`);
            setDetailed(response.data.find(request => request.id === id));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleClose = () => {
        setDetailed(null);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'red';
            case 'Accepted':
                return 'yellow';
            case 'Completed':
                return 'green';
            default:
                return '';
        }
    };

    return (
        <div className='show-request-body-trackChanges'>
            <div className="home-and-sort-title-trackChanges"><EngineerSidebar/><h2>Track Requests</h2></div>
            <table className="request-table">
                <thead>
                    <tr>
                        <th className="request-table-heading">Request Type</th>
                        <th className="request-table-heading">Request Date</th>
                        <th className="request-table-heading">Equipment Name</th>
                        <th className="request-table-heading">Department</th>
                        <th className="request-table-heading">Status</th>
                        <th className="request-table-heading">Assigned</th>
                        <th className="request-table-heading">Requested By</th>
                        <th className="request-table-heading">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {handleRequest.map((RequestByType) => (
                        <tr key={RequestByType.id}>
                            <td className="request-table-data">{RequestByType.requestType}</td>
                            <td  className="request-table-data">{RequestByType.requestDate}</td>
                            <td  className="request-table-data">{RequestByType.equipmentName}</td>
                            <td  className="request-table-data">{RequestByType.department}</td>
                            <td className="request-table-dataa" style={{ backgroundColor: getStatusColor(RequestByType.status) }}>{RequestByType.status}</td>
                            <td  className="request-table-data">{RequestByType.action}</td>
                            <td  className="request-table-data">{RequestByType.requestedBy}</td>
                            <td className="request-table-data">
                                <button onClick={() => getById(RequestByType.id)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {detailed && (
                <div className='detailed-view-1-trackchanges'>
                    <div className='detail-description-trackChanges'>
                      Request Detail
                        <div className='device-description-trackChanges'>
                            {Object.entries(detailed).map(([columnName, value]) => {
                                if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                    if (value != null) {
                                        const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
                                        return (
                                            <div className="sort-by-request-trackChanges" key={columnName}>
                                                <div className="columnName-trackChanges">{formattedColumnName}</div>
                                                <div className='columnValue-trackChanges'>{value}</div>
                                            </div>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </div>
                        <button onClick={handleClose} className='detail-close-button-trackChanges'>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EngineerTrackChanges;
