import React, {} from 'react';

import AllCryptoDisplay from '../components/AllCryptoDisplay';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopGainersDisplay from '../components/TopGainersDisplay';

const AllCryptosOverview: React.FC = () => {

return (
<>
<Header />
<div className=' bg-dark-gray min-h-screen w-full flex flex-col'>

<h1 className='flex mt-20 text-6xl justify-center text-amber-50'>Markets Overview</h1>
<div className='flex gap-6 justify-center'>
  <TopGainersDisplay />
  <TopGainersDisplay />
  <TopGainersDisplay />
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