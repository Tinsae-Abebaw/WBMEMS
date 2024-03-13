import React, { useState } from 'react';
import './Announcement.css';
import Home from '../pages/Home/Home';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { incrementNotificationCount } from '../StateManagement/actions/notificationActions';


const AnnouncementForm = ({ setNotificationCount }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(incrementNotificationCount());
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePost = async () => {
    const announcement_time = DateTime.utc().toISO();
    try {
      if(title.length > 0 && description.length > 0){
        await axios.post('http://localhost:7000/api/announcements', {
          title,
          description,
          announcement_time,
        });
        alert('Announcement posted Successfully');
        handleClear();
        handleNotification();
       
      } else {
        alert('Please fill both fields');
      }
    } catch (error) {
      console.error('Error posting announcement:', error);
    }
  };

  const handleNotification=async()=>{
    try{
      await axios.post('http://localhost:7000/api/alertAndNotification',{NotificationType: 'Announcement'});
    }catch(error){
      console.error('error posting Announcement Type', error.message)
    }
  };

  const handleClear = () => {
    // Clear form fields
    setTitle('');
    setDescription('');
  };

  return (
    <div className='ma'>
      <div className='home-container'><Home/><h2 className='announcement-title'>Write Announcement</h2></div>
      <div className='main-announcement'>
        <div className='under-title'>
          <label className="title-label">Announcement Title</label>
          <input
            className='title-input'
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label className='description-label'>Announcement Description</label>
          <textarea
            className='description-input'
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className='the-two-buttons'>
            <button className='announcement-button' onClick={handlePost}>Post</button>
            <button className='clear-announcement-button' onClick={handleClear}>Clear</button>
          </div>
         </div>
      </div>
    </div> 
  );
};

export default AnnouncementForm;
