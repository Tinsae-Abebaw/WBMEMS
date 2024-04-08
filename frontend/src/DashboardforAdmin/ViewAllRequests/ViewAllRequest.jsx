import axios from "axios";
import React, { useEffect, useState } from "react";
import './ViewAllRequest.css';
import AdminstratorHome from "../SidebarAdmin";


const ViewAllRequest = () => {
    const [handleRequest, setHandlerequest] = useState([]);
    const [idHolder, setIdHolder] = useState(false);
    const [detailed, setDetailed] = useState(null);
    const [reportDetail,setReportDetail]=useState(null);


    useEffect(() => {
        defaultRequestList();
    }, [idHolder]);

    const defaultRequestList = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions`);
            setHandlerequest(response.data.reverse());
        } catch (error) {
            console.error('Error fetching the requests:', error);
        }
    }
    
    const getById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getById?id=${id}`);
            setDetailed(response.data.find(request => request.id === id));
            setIdHolder
        } catch (error) {
            console.error('Error fetching requests:', error);
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

    const handleCloseReport = () => {
        setReportDetail(null);
    };

    const handleClose = () => {
        setDetailed(null);
        setIdHolder((prevIdHolder) => !prevIdHolder);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#d80a0a';
            case 'Accepted':
                return '#000080';
            case 'Completed':
                return '#0b7e3b';
            case 'Purchased':
                return '#800020';
            case 'Arranged':
                return '#FFA500';
            default:
                return '';
        }
    };

    return (
        <div className='show-request-body-admin-trackChanges'>
            <div className="home-and-sort-title-Adminn"><AdminstratorHome/><h2>Track Requests</h2></div>
           <div className="bubu">
           <table className="admin-request-table">
                <thead>
                    <tr>
                        <th className="Admin-request-table-headers">Request Type</th>
                        <th className="Admin-request-table-headers">Request Date</th>
                        <th className="Admin-request-table-headers">Equipment Name</th>
                        <th className="Admin-request-table-headers">Department</th>
                        <th className="Admin-request-table-headers">Req. Status</th>
                        <th className="Admin-request-table-headers">Assigned To</th>
                        <th className="Admin-request-table-headers">Requested By</th>
                        <th className="Admin-request-table-headers">Details</th>
                    </tr>
                </thead>
                <tbody>
                {handleRequest.map((RequestByType) => (
                    <tr key={RequestByType.id}>
                    <td className="Admin-request-table-data">{RequestByType.requestType}</td>
                    <td className="Admin-request-table-data">{RequestByType.requestDate}</td>
                    <td className="Admin-request-table-data">{RequestByType.equipmentName}</td>
                    <td className="Admin-request-table-data">{RequestByType.department}</td>
                    <td className="Admin-request-table-dataa" style={{ backgroundColor: getStatusColor(RequestByType.status) }}>{RequestByType.status}</td>
                    <td className="Admin-request-table-data">{RequestByType.action}</td>
                    <td className="Admin-request-table-data">{RequestByType.requestedBy}</td>
                    <td className="Admin-request-table-data">
            <button className="Admin-request-table-Detail-button"  onClick={() => getById(RequestByType.id)}>Detail</button>
            {RequestByType.status === 'Completed' && (RequestByType.requestType !== 'procurement' && RequestByType.requestType !== 'training') && (
                <button className="Admin-request-table-Report-button" onClick={() => getByIdReport(RequestByType.id)}>Report</button>
            )}
        </td>
    </tr>
))}

                </tbody>
            </table>
           </div>
            {detailed && (
                <div className='detailed-view-1-trackchanges'>
                    <div className='detail-description-trackChanges'>
                      <div className="Request-Detail-for-admin">Request Detail</div>
                        <div className='device-description-trackChanges'>
                            {Object.entries(detailed).map(([columnName, value]) => {
                                if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                    if (value != null) {
                                        const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
                                        return (
                                            <div className="sort-by-request-trackChanges" key={columnName}>
                                                <div className="columnName-trackChanges">{formattedColumnName}</div>
                                                <div className='columnValue-trackChanges-admin'>{value}</div>
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
            {reportDetail && (
                <div className='detailed-view-1'>
                    <div className='detail-description-detailed'>
                        <div className="Request-Detail-for-admin">Report Detail</div>
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

export default ViewAllRequest;
