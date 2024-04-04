import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import DoctorSidebar from './DoctorSidebar';
import './RequestHistory.css';
const RequestHistory = () => {

    const [requestedHistory, setRequestedHistory] = useState([]);

    useEffect(() => {
        handleRequestHistory();
      }, [requestedHistory]);
    const handleRequestHistory = async()=>{
        try {
            const response = await axios.get('http://localhost:7000/api/request');
            if (response.status === 200) {
              const announcementsWithLocalTime = response.data.map(requestHistory => ({
                ...requestHistory,
                announcement_time: DateTime.fromISO(requestHistory.announcement_time).toLocaleString(DateTime.DATETIME_MED),
              }));
              setRequestedHistory(announcementsWithLocalTime.reverse());
            } else {
              throw new Error('Failed to fetch Requested History');
            }
          } catch (error) {
            console.error('Error fetching Requested History:', error);
          }
        };

    return ( 
        <div>
            njk 
        </div>
     );
};
 
export default RequestHistory;