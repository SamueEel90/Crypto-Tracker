import React, {} from 'react';

import AllCryptoDisplay from '../components/AllCryptoDisplay';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopGainersDisplay from '../components/TopGainersDisplay';
import TopLosersDisplay from '../components/TopLosersDisplay';
import TopVolumeDisplay from '../components/TopVolumeDisplay';
import HomePage from './HomePage';
import HotCoinsDisplay from '../components/HotCoinsDisplay';

const AllCryptosOverview: React.FC = () => {

return (
<>
<Header />
<div className=' bg-dark-gray min-h-screen w-full flex flex-col'>

<div className='flex p-4 items-center justify-between mx-50'>
<h1 className='flex mt-20 text-2xl justify-center  text-amber-50'>Markets Overview</h1>


</div>
<div className='flex gap-6 justify-center mx-50'>
  <HotCoinsDisplay />
  <TopGainersDisplay />
  <TopLosersDisplay />
  <TopVolumeDisplay />
</div>

<div className=' outline-gray-700 outline-1 rounded-lg m-2 p-4 mx-50'>
  <h2 className='text-3xl text-left text-amber-50 p-4'>Top Tokens by Market Capitalization</h2>
  <p className='text-gray-500 p-4'>Get a comprehensive snapshot of all cryptocurrencies available on SCrypto. This page displays the latest prices, 24-hour trading volume, price changes, and market capitalizations for all cryptocurrencies on SCrypto. Users can quickly access key information about these digital assets and access the trade page from here.</p>
</div>


<div className='flex  justify-center items-center'>
  <AllCryptoDisplay />
</div>
<Footer />
</div>

</>
);
};
export default AllCryptosOverview;