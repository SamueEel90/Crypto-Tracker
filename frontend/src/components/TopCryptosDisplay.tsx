import React, { useEffect } from 'react';
import { useBinanceTicker24h } from '../features/Binance';
import { useNavigate } from 'react-router-dom';

const TopCryptosDisplay: React.FC = () => {
  const { refetch, data, isLoading, error } = useBinanceTicker24h();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); 
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      {isLoading ? (
        <div className="text-white mt-30">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-10">Error: {error.message}</div>
      ) : (
        <div className="flex flex-col mt-20 bg-gray-800 rounded-lg w-full lg:w-[30rem] max-h-[30rem]  overflow-y-auto px-4 py-2 space-y-2">
          <div className="flex justify-between mb-4 border-b border-gray-700 pb-2">
            <button className="text-amber-50 text-sm sm:text-base">Popular</button>
            <button className="text-amber-50 text-sm sm:text-base">New Listing</button>
            <button
              className="text-twitter-blue text-sm sm:text-base font-semibold"
              onClick={() => navigate('/CryptoOverview')}
            >
              View All 300+
            </button>
          </div>

          {data?.map((ticker) => {
            const isPositive = parseFloat(ticker.priceChangePercent) >= 0;
            return (
              <div
                key={ticker.symbol}
                className="flex justify-between items-center text-amber-50 text-sm sm:text-base border-b border-gray-600 py-2"
              >
                <div className="flex-1 text-left">{ticker.symbol}</div>
                <div className="flex-1 text-center">${Number(ticker.lastPrice).toFixed(2)}</div>
                <div className={`flex-1 text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {Number(ticker.priceChangePercent).toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TopCryptosDisplay;
