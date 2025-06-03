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
    if (!user?.username) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

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

  if (loading) return <p>Loading wallet overview...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Wallet Overview (USDC)</h2>
      <p className="text-lg mb-4">
        Total Value: <strong>{data?.totalValueUSDC.toFixed(2)} USDC</strong>
      </p>
      {data?.balances.length === 0 ? (
        <p>No assets with balance.</p>
      ) : (
        <ul>
          {data?.balances.map((item) => (
            <li key={item.asset} className="mb-2 border-b border-gray-700 pb-2">
              <div className="flex justify-between">
                <span>{item.asset}</span>
                <span>{item.valueUSDC.toFixed(2)} USDC</span>
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
