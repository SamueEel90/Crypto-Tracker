import profileIcon from '../assets/Profile.png';
import searchIcon from '../assets/SearchIcon.png';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../context/AuthorizationContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthorization();

  return (
    <div className="fixed top-0 w-full p-4 h-16 bg-dark-gray text-white">
      <div className="flex justify-between">
        <ul className="flex space-x-4 items-center">
          <li>
            <a className="text-twitter-blue text-3xl" href="/homePage">
              {isAuthenticated ? user?.username || 'SCrypto' : 'SCrypto'}
            </a>
          </li>
          <li>
            <a href="/homePage">Buy Crypto</a>
          </li>
          <li>
            <a href="/homePage">Markets</a>
          </li>
          <li>
            <a href="/homePage">Auto-Invest</a>
          </li>
          <li>
            <a href="/homePage">Crypto Bots</a>
          </li>
        </ul>
        <ul className="flex space-x-6 items-center">
          <li>
            <img className="w-5 h-5" src={searchIcon} alt="Search" />
          </li>
          <li>
            <button
              className="bg-twitter-blue w-24 h-8 rounded-2xl"
              onClick={() => navigate('/YourWallet')}
            >
              Wallet
            </button>
          </li>
          <li>
            <img className="w-8 h-8 mr-10" src={profileIcon} alt="Profile" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
