import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { fetchPairData, fetchTopPrices } from '../api/binance';
import TopCryptosDisplay from '../components/TopCryptosDisplay';

const HomePage: React.FC = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [priceData, setPriceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pair = "BTCUSDT";

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pairInfo, topPrices] = await Promise.all([
          fetchPairData(pair),
          fetchTopPrices(),
        ]);

        setPriceData(pairInfo);
        setPrices(topPrices);
      } catch (error) {
        console.error('Error loading crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <Header />
      <h1 className='text-8xl text-white'>Welcome to the</h1>
      <h1 className='text-8xl font-semibold text-twitter-blue'>SCrypto Tracker</h1>
      <p>This is a simple React application with routing.</p>

      <h1 className="text-xl font-bold mb-2">Crypto Pair: {pair}</h1>
      <p>Last Price: {priceData?.lastPrice}</p>
      <p>Price Change: {priceData?.priceChange}</p>
      <p>Price Change Percent: {priceData?.priceChangePercent}</p>
      <p>High Price: {priceData?.highPrice}</p>
      <p>Low Price: {priceData?.lowPrice}</p>
      <p>Open Price: {priceData?.openPrice}</p>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Top Cryptos</h1>
        {loading ? <p>Loading...</p> : (
          <ul>
            {prices.map((item) => (
              <li key={item.symbol} className="mb-2">
                <strong>{item.symbol}:</strong> ${item.lastPrice} ({item.priceChangePercent}%)
              </li>
            ))}
          </ul>
        )}
      </div>
      <TopCryptosDisplay />
    </div>
  );
};

export default HomePage;
