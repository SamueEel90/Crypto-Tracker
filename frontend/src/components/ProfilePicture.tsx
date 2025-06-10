import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthorization } from '../context/AuthorizationContext';

const ProfilePicture: React.FC = () => {
  const { user } = useAuthorization();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    if (!user?.username) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/profile/${user.username}`);
        setProfilePicture(res.data.profilePicture || null);
      } catch (err) {
        setError('Failed to load profile picture');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.username]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user?.username) return;

    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('username', user.username);

    try {
      const res = await axios.post('/api/auth/upload-profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProfilePicture(res.data.profilePicture); 
      setFile(null); 
    } catch (err) {
      setError('Failed to upload profile picture');
    }
  };

  if (loading) return <p>Loading...</p>;
 

  return (
    <div className="flex ml-8 justify-center sm:justify-start">
      {profilePicture ? (
        <img
          src={`${baseURL}${profilePicture}`}
          alt={`${user?.username} profile`}
          className="flex w-30 h-30 rounded-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;