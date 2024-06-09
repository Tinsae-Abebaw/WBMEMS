import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffInformation.css';
import Home from '../pages/Home/Home'

const StaffInformation = () => {
  const [staffInformation, setStaffInformation] = useState([]);

  useEffect(() => {
    fetchStaffInformation();
  }, []);

  const fetchStaffInformation = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/registration');
      if (response.status === 200) {
        const userInformation = response.data.map(user => ({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          occupation: user.occupation,
          profilePicture: user.profilePicture, // Assuming you have a field named 'profilePicture' in your user object
        }));
        setStaffInformation(userInformation.reverse());
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return ( 
  <div>
   <div  className='usermain'><div className='invent'><Home/><h2>Staff Information</h2></div></div> 
      <div className='user-table'>
        {staffInformation.map((user) => (
          <div className='individual-user' key={user.id}>
            <img className='image' src={`http://localhost:7000/${user.profilePicture}`} alt='Profile' />
            <div className='staff-description'>
              <p className='staff-name'>{user.name} {user.lastName} <div className='occ'> <div>{user.occupation}</div> {user.phoneNumber}</div></p>
              <p className='staff-occupation'></p>
              <p className='staff-email'>{user.email}</p>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffInformation;
