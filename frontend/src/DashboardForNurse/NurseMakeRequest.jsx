import React, { useEffect, useState } from 'react';
import './DoctorMakeRequest.css'
import DoctorSidebar from './NurseSidebar';
import { DateTime } from 'luxon';
import axios from 'axios';

const DoctorMakeRequest = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stat, setStat] = useState(false);
   
    useEffect(() => {
        // Set 'stat' to true once when the component mounts
        setStat(false);
    }, []);

    const handleTitle = (e)=>{
        setTitle(e.target.value);
    };
    const handleDescription =(e)=>{
        setDescription(e.target.value);
    };
    

    const handleRequest = async() =>{
        const announcement_time = DateTime.utc().toISO();
        try{
            if(title.length>0 && description.length>0){
                await axios.post('http://localhost:7000/api/request',
                {
                    title,
                    description,
                    announcement_time,
                    stat
                })
                alert('Requested Successfuly');
                setTitle('');
                setDescription('');
            }else{
                alert('Please fill all the fields');
            }
        }catch(err){
            console.error('error happened', err)
        }
    }
  return (
    <div>
      <div className='burger-and-title'><DoctorSidebar/><h2>Making Request</h2></div>
      <div className='all-labels-and-inputs'>
        <label className='request-title-label'>Request Title</label>
        <input 
        className='request-title'
        id='title'
        onChange={handleTitle}
        value={title}/>
        <label className='request-title-label'>Request Description</label>
        <textarea
            className='request-description'
            id="description"
            value={description}
            onChange={handleDescription}
          />
     <button className='send-request-button' onClick={handleRequest}>Send Request</button>

      </div>
    </div>
  );
};

export default DoctorMakeRequest;
