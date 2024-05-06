import React, { useEffect, useState } from "react";
import './UserPicture.css';

const UserPicture = () => {
    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage on component mount
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

  
    return ( 
        <div className="dashboard-user-image">
          <img className='profile-image-head' src={`http://localhost:7000/${user.profilePicture}`} alt='Profile' />
        </div>
     );
}
 
export default UserPicture;