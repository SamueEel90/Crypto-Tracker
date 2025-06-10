import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthorization } from '../context/AuthorizationContext';

interface BalanceItem {
  asset: string;
  free: number;
  locked: number;
  priceUSDC: number;
  valueUSDC: number;
}

interface WalletOverviewResponse {
  totalValueUSDC: number;
  balances: BalanceItem[];
}

const WalletBalance: React.FC = () => {
  const { user } = useAuthorization();
  const [data, setData] = useState<WalletOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.username) return;


    const fetchOverview = async () => {
      try {
        const response = await axios.get<WalletOverviewResponse>(`/api/binance/walletBalance/${user.username}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [user?.username]);

  if (loading) {
  return (
    <div className="flex flex-col mt-8 bg-gray-800 rounded-lg w-full lg:w-[30rem] max-h-[30rem] overflow-y-auto px-4 py-2 space-y-2">
      <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse mb-4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-700 rounded animate-pulse mb-2" />
      ))}
    </div>
  );
}
 if (error) {
  return (
    <div className="flex flex-col mt-8 bg-red-100 border border-red-400 text-red-800 rounded-lg w-full lg:w-[30rem] px-4 py-3">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline mt-1">{error}</span>
    </div>
  );
}

  return (
    <div className="flex flex-col mt-8 bg-gray-800 rounded-lg w-full lg:w-[30rem] max-h-[30rem]  overflow-y-auto px-4 py-2 space-y-2">
      <h2 className="text-xl text-amber-50 font-semibold mb-4">Wallet Overview (USDC)</h2>
      <p className="text-lg mb-4 text-twitter-blue font">
        Total Value: <strong>{data?.totalValueUSDC.toFixed(2)} USDC</strong>
      </p>
      {data?.balances.length === 0 ? (
        <p>No assets with balance.</p>
      ) : (
        <ul>
          {data?.balances.map((item) => (
            <li key={item.asset} className="mb-2 border-b border-gray-700 pb-2">
              <div className="flex justify-between">
                <span className=' text-amber-50 font'>{item.asset}</span>
                <span className=' text-amber-50'>{item.valueUSDC.toFixed(2)} USDC</span>
              </div>
              <div className="text-sm text-gray-400">
                Free: {item.free} | Locked: {item.locked} | Price: {item.priceUSDC.toFixed(4)} USDC
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletBalance;
