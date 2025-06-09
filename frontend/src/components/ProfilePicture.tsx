import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthorization } from '../context/AuthorizationContext';

const ProfilePicture: React.FC = () => {
  const { user } = useAuthorization();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const baseURL = 'http://localhost:5000';
  useEffect(() => {
    if (!user?.username) {
      setError('User not logged in');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/profile/${user.username}`);
        setProfilePicture(res.data.profilePicture);
        console.log('Profile picture loaded:', res.data.profilePicture);
      } catch (err) {
        setError('Failed to load profile picture');
      }
    };

    fetchProfile();
  }, [user?.username]);

  if (error) return <p>{error}</p>;

  return (
   
 <img
    src={profilePicture ? `${baseURL}${profilePicture}` : undefined}
    alt={`${user?.username} profile`}
    className="w-24 h-24 rounded-full object-cover"
  />
    
  );
};

export default ProfilePicture;
