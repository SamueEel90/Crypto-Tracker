import React from 'react';
import Header from '../components/Header';
import TopCryptosDisplay from '../components/TopCryptosDisplay';

const HomePage: React.FC = () => {
  return (
    <div className="bg-dark-gray h-screen">
      <Header />
      <div className="flex flex-row space-x-8">
        <div>
          <h1 className="text-8xl text-white">Welcome to the</h1>
          <h1 className="text-8xl font-semibold text-twitter-blue">SCrypto</h1>
           
        {/* {if logged in, show this} */}        
         
         <form className="flex ml-4 mt-12">
            <input
              className="bg-dark-gray rounded-md  w-80 h-10 outline-1 outline-gray-600 placeholder-amber-50 pl-2"
              type="text"
              placeholder="Continue with your email"
            />
            <button
              type="submit"
              style={{ backgroundColor: 'rgba(29, 155, 209, 1)' }}
              className="h-10 w-40 text-white font-bold  ml-4 rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>

     

        <div className="ml-auto pt-8 pr-40">
          <TopCryptosDisplay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
