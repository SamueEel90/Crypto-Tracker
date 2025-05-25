import React, {useEffect, } from 'react';
import { useFetchAllCryptos } from '../features/useFetchAllCryptos';


const AllCryptoDisplay: React.FC = () => {

  const { data, error, isLoading } = useFetchAllCryptos();

console.log("All Cryptos Data:", data);
useEffect(() => {

 }
, []);

  return (

<div className='bg-dark-gray '>
 
 
 
  {data?.map((crypto) => (

    <div className='grid grid-cols-6  h-14 ' key={crypto.symbol}>
      <div className='text-amber-50 max-w-12'>{crypto.symbol.toUpperCase()}
        <span className='ml-2 text-twitter-blue-muted'>{crypto.name.slice(0,12)}</span>
      </div>
     
      <div className='text-amber-50'>${crypto.current_price.toFixed(2)}</div>
      <div className='text-red-500'>{crypto.price_change_24h.toFixed(2)}</div>
      <div>
        {(crypto.total_volume / 1_000_000_000).toFixed(2)}B
      </div>
      <div>
        {(crypto.market_cap / 1_000_0000_000).toFixed(2)}B
      </div>
      <div>
        <button>x</button> /  <button>y</button>
      </div>
     
    </div>
  ))}
</div>
)
}
export default AllCryptoDisplay;