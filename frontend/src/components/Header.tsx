
import searchIcon from '../assets/SearchIcon.png';
import {useNavigate } from 'react-router-dom';
import { useAuthorization } from '../context/AuthorizationContext';
import ProfileDropDown from './ProfileDropDown';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthorization();

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-2 bg-dark-gray text-white shadow-md">
      <div className="flex flex-wrap justify-between items-center">
        
        <ul className="flex flex-wrap items-center space-x-4">
          <li>
            <a className="text-twitter-blue text-2xl sm:text-3xl font-semibold" href="/">
              {isAuthenticated ? user?.username : 'SCrypto'}
            </a>
          </li>
          <li className="hidden sm:inline">
            <a href="/" className="hover:text-twitter-blue">Buy Crypto</a>
          </li>
          <li className="hidden sm:inline">
            <a href="/" className="hover:text-twitter-blue">Markets</a>
          </li>
          <li className="hidden sm:inline">
            <a href="/" className="hover:text-twitter-blue">Auto-Invest</a>
          </li>
          <li className="hidden sm:inline">
            <a href="/" className="hover:text-twitter-blue">Crypto Bots</a>
          </li>
        </ul>



        <ul className="flex items-center space-x-4 sm:space-x-6 mt-2 sm:mt-0">
          {isAuthenticated ? (
                   <>
              <li>
                <img className="w-6 h-6 cursor-pointer" src={searchIcon} alt="Search" />
              </li> 
              <li> 
                <ProfileDropDown />
              </li>
              <li>
                <button
                  className="bg-twitter-blue w-24 h-8 rounded-2xl text-sm font-medium hover:brightness-110 transition"
                  onClick={() => navigate('/YourWallet')}
                >
                  Wallet
                </button>
              </li>
             
             
            </>  
          ) : (
    <>
              <button
                className="bg-twitter-blue w-20 h-6 rounded-2xl text-sm font-medium hover:brightness-110 transition"
                onClick={() => navigate('/LoginPage')}
              >
                Login
              </button>
              <button
                className="bg-twitter-blue w-20 h-6 rounded-2xl text-sm font-medium hover:brightness-110 transition"
                onClick={() => navigate('/RegisterPage')}
              >
                Sign Up
              </button>
            </> 
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
