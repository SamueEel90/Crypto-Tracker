import React from 'react';
import Header from '../components/Header';
import TopCryptosDisplay from '../components/TopCryptosDisplay';
import CryptoNews from '../components/CryptoNews';
import  { useAuthorization } from '../context/AuthorizationContext';
import WalletBalance from '../components/WalletBalance';
const HomePage: React.FC = () => {
const {isAuthenticated, user} = useAuthorization();
  return (
    <div className="bg-dark-gray min-h-screen">
      <Header />
      <div className="flex flex-row space-x-8">
        <div>
          <h1 className="text-8xl text-white ml-60 mt-40">Welcome to the</h1>
          <h1 className="text-8xl font-semibold text-twitter-blue ml-60">SCrypto</h1>

          {/* {if logged in, show this} */}

         {!isAuthenticated ? (
         
          <form className="ml-60 flex mt-12">
            <input
              className="bg-dark-gray rounded-md w-80 h-10 outline-1 outline-gray-600 placeholder-amber-50 pl-2"
              type="text"
              placeholder="Continue with your email"
            />
            <button
              type="submit"
              style={{ backgroundColor: 'rgba(29, 155, 209, 1)' }}
              className="h-10 w-40 text-white font-bold text-xl ml-4 rounded-md"
            >
              Sign Up
            </button>
          </form>
         ) : (         
          <button className="text-amber-50 font-bold text-xl bg-twitter-blue rounded-xl h-10 w-124 ml-60 mt-20">
            Connect Your Crypto Wallet
          </button>

        )};


          <p className="text-4xl ml-60 mt-10 text-amber-50">
            Trade on the go. Anywhere, anytime.
            
          </p>
          <div className="ml-60 py-12  rounded-lg  text-amber-50 space-y-4">
            <p className="text-lg font-semibold">
              Track your personal portfolio and account balance

            </p>
            <p className="text-lg font-semibold">
              Use Our <span className='text-twitter-blue'>Auto-Invest</span> Strategies or <span className='text-twitter-blue'>AI Trading Bots</span>
            </p>
            <p className="text-lg font-semibold">
              and let your portfolio management to us
            </p>
            <p className="text-xl font-bold mt-6">Start investing from <span className='text-twitter-blue'>$10</span></p>
            

          </div>
        </div>

        


     

        <div className="ml-auto pt-8 ">
          <TopCryptosDisplay />
          <CryptoNews />
          <WalletBalance />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
