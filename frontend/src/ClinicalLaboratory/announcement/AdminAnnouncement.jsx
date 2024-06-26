import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAnnouncement.css';
import { DateTime } from 'luxon';
import { BsCheckAll } from "react-icons/bs";
import LabSidebar from '../sidebar/Sidebar';

const LabDisplayAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
});
 
  useEffect(() => {
    fetchAnnouncements();
    EraseNotifications();
  }, []);

  const EraseNotifications = async () => {
    try {
      await axios.put('http://localhost:7000/api/alertAndNotification/notification', {
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  };


  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/announcements');
      if (response.status === 200) {
        const announcementsWithLocalTime = response.data.map(announcement => ({
          ...announcement,
          announcement_time: DateTime.fromISO(announcement.announcement_time).toLocaleString(DateTime.DATETIME_MED),
        }));
        setAnnouncements(announcementsWithLocalTime.reverse());
      } else {
        throw new Error('Failed to fetch announcements');
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  
  return (
    <div className='announcement-table'>
      <div className='announcement-main-head'> <LabSidebar/> <h2 className='announcements-main-title'>Announcements</h2></div>
      <div className='main-individual-admin'>
      {announcements.map((announcement) => (
        <div className='individual-announcement-display-admin' key={announcement.id}>
          <h3 className='announcement-heading'>{announcement.title} <p className='announcememnt-moment'>{announcement.announcement_time}</p><BsCheckAll className='tick-seen'/></h3>
          <p className='announcement-description'>{announcement.description}</p>
        </div>
      ))}
       </div>
    </div>
  );
};

export default LabDisplayAnnouncement;
