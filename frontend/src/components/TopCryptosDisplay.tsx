import React from 'react';
import { useBinanceTicker24h } from '../features/use24hticker';

const TopCryptosDisplay: React.FC = () => {


  const { data, isLoading, error } = useBinanceTicker24h();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div  style={{backgroundColor: '#f0f0f0'}}>
          <h2 >Top Cryptos</h2>
    
         
              {data?.map((ticker) => (
                <div 
                className='flex flex-row' 
                key={ticker.symbol}
                >
                  
                  <div>{ticker.symbol}</div>
                  <div>{ticker.priceChange}</div>
                  <div>{ticker.priceChangePercent}</div>
                  <div>{ticker.lastPrice}</div>
                </div>
              ))}
         
        </div>
      )}
    </>
  );
};

export default TopCryptosDisplay;