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

const ProfileWalletBalance: React.FC = () => {
  const { user } = useAuthorization();
  const [data, setData] = useState<WalletOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 


  useEffect(() => {
    if (!user?.username) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const fetchOverview = async () => {
      try {
        const response = await axios.get<WalletOverviewResponse>(
          `/api/binance/walletBalance/${user.username}`
        );
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
      <div className="flex flex-col mt-8 bg-gray-800 rounded-lg w-full  max-h-[30rem] overflow-y-auto px-4 py-2 space-y-2">
        <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-700 rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }



  return (
    <div className="flex flex-col mt-8 bg-gray-800 rounded-lg mx-7 max-h-[30rem] overflow-y-auto px-4 py-2 space-y-2">
      <div className="flex flex-col mb-4">
       
      
        <p className="text-amber-50">{user?.username}</p>
      </div>
      <h2 className="text-xl text-amber-50 font-semibold mb-4">
        Estimated Wallet Balance
        <strong>{' '}{data?.totalValueUSDC.toFixed(2)} USDC</strong>
      </h2>
      
      <h3 className="text-lg text-amber-50 font-semibold mb-2">
        €{data ? (data.totalValueUSDC * 0.92).toFixed(2) : '0.00'}
      </h3>
      {data?.balances.length === 0 ? (
        <p>No assets with balance.</p>
      ) : (
        <ul>
          {data?.balances.map((item) => (
            <li key={item.asset} className="mb-2 border-b border-gray-700 pb-2">
              <div className="flex">
                <span className="text-amber-50 font">Today's PnL</span>{' '}
                <span className="text-amber-50">{item.valueUSDC.toFixed(2)} USDC</span>
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

export default ProfileWalletBalance;
