import React , {useEffect} from 'react';
import { useBinanceTicker24h } from '../features/Binance';
import {  useNavigate } from 'react-router-dom';

const TopCryptosDisplay: React.FC = () => {


  const { refetch, data, isLoading, error } = useBinanceTicker24h();
 const navigate = useNavigate()
  useEffect(() => {
  const interval = setInterval(() => {
    refetch();
  }, 1000000000); 
  return () => clearInterval(interval);
}, []);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className='flex flex-col bg-light-gray overflow-y-auto rounded-lg w-120 h-auto mt-20 mr-60'>
          <div className='flex flex-row justify-between '>
            <button className='text-amber-50 mx-2 text-l '>Popular</button>
            <button className='text-amber-50 mx-2 text-l'>New Listing</button>
            <button className='text-amber-50 mx-2 text-l text-right'
                    onClick={() => navigate('/CryptoOverview')}
            >View All300+</button>
          </div>
          {data?.map((ticker) => (
            <div
              className='flex flex-row m-1 items-center justify-between px-4 py-1'
              key={ticker.symbol}
            >
              <div className=' text-xl text-amber-50 flex-1 text-left'>{ticker.symbol}</div>
              <div className='text-xl text-amber-50 flex-1 text-center'>${Number(ticker.lastPrice).toFixed(2)}</div>
              <div className='text-xl text-green-500 flex-1 text-right'>{ticker.priceChangePercent}%</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopCryptosDisplay;