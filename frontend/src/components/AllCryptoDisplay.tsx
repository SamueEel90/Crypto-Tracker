import React, { useEffect } from 'react';
import { useFetchAllCryptos } from '../features/CoinGecko';
import clsx from 'clsx';
const AllCryptoDisplay: React.FC = () => {
  const { data } = useFetchAllCryptos();

  useEffect(() => {}, []);

  return (
    <div className='pl-42 bg-dark-gray py-10'>
      
       
      <div className='grid grid-cols-6 h-10 font-bold text-amber-50  '>
        <div className='ml-4'>Symbol / Name</div>
        <div>Price</div>
        <div>24h Change</div>
        <div>Volume</div>
        <div>Market Cap</div>
        <div>Actions</div>
      </div>
      {data?.map((crypto) => (
        <div className='grid grid-cols-6 h-14  min-w-200 w-300' key={crypto.id}>
          <div className='text-amber-50 max-w-16 ml-4 '>
            <strong></strong>{crypto.symbol.toUpperCase()}
            <span className='ml-2 text-twitter-blue-muted pr-4'>
              {crypto.name.slice(0, 12)}
            </span>
          </div>
          <div className='text-amber-50'>
            ${crypto.current_price.toFixed(2)}
          </div>
          <div className={clsx({
            'text-green-500': crypto.price_change_percentage_24h > 0,
            'text-red-500' : crypto.price_change_percentage_24h <= 0
          })
          }>
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div className='text-amber-50'>
            {(crypto.total_volume / 1_000_000_000).toFixed(2)}B
          </div>
          <div className='text-amber-50'>
            {(crypto.market_cap / 1_000_000_000).toFixed(2)}B
          </div>
          <div className='text-amber-50'>
            <button>x</button> / <button>y</button>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default AllCryptoDisplay;