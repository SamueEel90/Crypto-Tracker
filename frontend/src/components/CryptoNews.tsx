import React from 'react';

const CryptoNews: React.FC = () => {
  const newsItems = [
    "Bitcoin Short Position by Whale Trader Reaches $488 Million",
    "FlowX Finance Resumes Services After Security Incident",
    "U.S. Bitcoin Spot ETF Sees Record Inflows"
  ];

  return (
    <div className="flex flex-col bg-light-gray rounded-lg w-full lg:w-[30rem] mt-6 max-h-[20rem] overflow-y-auto px-4 py-4 space-y-4">
      <p className="text-xl font-bold text-amber-50 border-b border-gray-700 pb-2">News</p>
      {newsItems.map((news, index) => (
        <p key={index} className="text-amber-50 text-sm sm:text-base border-b border-gray-600 pb-2">
          {news}
        </p>
      ))}
    </div>
  );
};

export default CryptoNews;