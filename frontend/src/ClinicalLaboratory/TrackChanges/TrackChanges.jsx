import axios from "axios";
import React, { useEffect, useState } from "react";
import './TrackChanges.css';
import RadiologistSidebar from "../sidebar/Sidebar";

const LabTrackChanges = () => {
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
                return '#800020';
            case 'Purchased':
                return '#0000FF';
            case 'Arranged':
                return '#800080';
            case 'Accepted':
                return '#FFA500';
            case 'Completed':
                return 'green';
            default:
                return '';
        }
    };

    return (
        <div className=''>
            <div className="track-and-sort-title-trackChanges"><RadiologistSidebar/><h2>Track Requests</h2></div>
            <div className="track-table-holder">
            <table className="track-request-table-lab">
                <thead>
                    <tr className="track-main-row">
                        <th className="track-table-headers">Request Type</th>
                        <th  className="track-table-headers">Request Date</th>
                        <th  className="track-table-headers">Equipment Name</th>
                        <th  className="track-table-headers">Department</th>
                        <th  className="track-table-headers">Status</th>
                        <th  className="track-table-headers">Assigned</th>
                        <th  className="track-table-headers">Requested By</th>
                        <th  className="track-table-headers">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {handleRequest.map((RequestByType) => (
                        <tr key={RequestByType.id}>
                            <td className="track-data">{RequestByType.requestType}</td>
                            <td className="track-data">{RequestByType.requestDate}</td>
                            <td className="track-data">{RequestByType.equipmentName}</td>
                            <td className="track-data">{RequestByType.department}</td>
                            <td className="track-data-lab" style={{ backgroundColor: getStatusColor(RequestByType.status) }}>{RequestByType.status}</td>
                            <td className="track-data">{RequestByType.action}</td>
                            <td className="track-data">{RequestByType.requestedBy}</td>
                            <td>
                                <button className="track-detail-button" onClick={() => getById(RequestByType.id)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
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

export default LabTrackChanges;
