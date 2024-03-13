import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EngineerAnnouncement.css';
import { DateTime } from 'luxon';
import EngineerSidebar from './EngineerSidebar';

const EngineerAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

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
      <div className='announcement-main'> <EngineerSidebar/> <h2 className='announcements-main-title'>Announcement Board</h2></div>
      <div className='main-individual'>
      {announcements.map((announcement) => (
        
          <div className='individual-announcement' key={announcement.id}>
            <h3 className='announcement-heading'>{announcement.title} <p className='announcememnt-moment'>{announcement.announcement_time}</p></h3>
            <p className='announcement-description'>{announcement.description}</p>
          </div>
       
      ))}
       </div>
    </div>
  );
};

export default EngineerAnnouncement;
