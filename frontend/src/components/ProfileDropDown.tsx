import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import profileIcon from '../assets/Profile.png'; 
import { useAuthorization } from "../context/AuthorizationContext";
import { useNavigate } from 'react-router-dom';
const ProfileDropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthorization();
  const navigate = useNavigate()
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleLogout = () => {
    logout();
    navigate('/')
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/profilePage">
        <img
          className="w-8 h-8 rounded-full cursor-pointer"
          src={profileIcon}
          alt="Profile"
        />
      </Link>
      {isOpen && (
        <ul className="absolute right-0 w-40 border-gray-600 rounded-md bg-amber-500">
          <li className="text-amber-50 text-l text-center hover:text-twitter-blue cursor-pointer">
            <span>Email</span>
          </li>
          <li className="text-amber-50 text-l text-center hover:text-twitter-blue cursor-pointer">
            <Link to="/YourWallet">Dashboard</Link>
          </li>
          <li className="text-amber-50 text-l text-center hover:text-twitter-blue cursor-pointer border-b">
            <Link to="/Settings">Assets</Link>
          </li>
          <li className="text-amber-50 text-l text-center hover:text-twitter-blue cursor-pointer">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropDown;