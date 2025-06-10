import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import profileIcon from '../assets/Profile.png'; 
import { useAuthorization } from "../context/AuthorizationContext";
import { useNavigate } from 'react-router-dom';
import { useFetchUserEmail } from '../features/Auth';
import { maskEmail } from '../utils/maskEmail';

const ProfileDropDown: React.FC = () => {
const { user } = useAuthorization();
const { data } = useFetchUserEmail(user?.username);
  console.log(data)
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
        <ul className="absolute right-0 w-50 border-gray-600 border-1 rounded-md bg-dark-gray">
          <li className="text-amber-50 text-l  hover:text-twitter-blue cursor-pointer">
            <span className='ml-1'>{maskEmail(data?.email)}</span>
          </li>
          <li className="text-amber-50 my-2 hover:text-twitter-blue cursor-pointer">
            <Link className='ml-1' to="/YourWallet">Dashboard</Link>
          </li>
          <li className="text-amber-50 text-l hover:text-twitter-blue cursor-pointer border-b border-gray-600">
            <Link className='ml-1' to="/Settings">Assets</Link>
          </li>
          <li className="text-amber-50 text-l mt-2  hover:text-twitter-blue cursor-pointer">
            <button className='ml-1' onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropDown;