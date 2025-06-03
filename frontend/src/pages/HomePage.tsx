import React from 'react';
import Header from '../components/Header';
import TopCryptosDisplay from '../components/TopCryptosDisplay';
import CryptoNews from '../components/CryptoNews';
import { useAuthorization } from '../context/AuthorizationContext';
import WalletBalance from '../components/WalletBalance';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthorization();
  const navigate = useNavigate();
  return (
    <div className="bg-dark-gray min-h-screen">
      <Header />

      <div className="flex flex-col lg:flex-row lg:space-x-8 px-6 sm:px-10 lg:px-20">
       
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl text-white mt-12 lg:mt-40">
            Welcome to the
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-semibold text-twitter-blue">
            SCrypto
          </h1>

          {!isAuthenticated ? (
            <form className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                className="bg-dark-gray rounded-md w-full sm:w-80 h-10 outline-1 outline-gray-600 placeholder-amber-50 pl-2"
                type="text"
                placeholder="Continue with your email"
              />
              <button
                type="submit"
                className="h-10 w-full sm:w-40 text-white font-bold text-lg rounded-md bg-twitter-blue"
                onClick={ ()=> navigate('/registerPage')}
              >
                Sign Up
              </button>
            </form>
          ) : (
            <button className="text-amber-50 font-bold text-lg bg-twitter-blue rounded-xl h-10 w-full sm:w-124 mt-8">
              Connect Your Crypto Wallet
            </button>
          )}

          <p className="text-xl sm:text-2xl lg:text-3xl text-amber-50 mt-10">
            Trade on the go. Anywhere, anytime.
          </p>

          <div className="mt-8 text-amber-50 space-y-4">
            <p className="text-base sm:text-lg font-semibold">
              Track your personal portfolio and account balance
            </p>
            <p className="text-base sm:text-lg font-semibold">
              Use Our <span className="text-twitter-blue">Auto-Invest</span> Strategies or{' '}
              <span className="text-twitter-blue">AI Trading Bots</span>
            </p>
            <p className="text-base sm:text-lg font-semibold">
              and let your portfolio management to us
            </p>
            <p className="text-lg sm:text-xl font-bold mt-6">
              Start investing from <span className="text-twitter-blue">$10</span>
            </p>
          </div>
        </div>

        
        <div className="flex-1 mt-10 lg:mt-0">
          <TopCryptosDisplay />
          <CryptoNews />
          
          <WalletBalance />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
