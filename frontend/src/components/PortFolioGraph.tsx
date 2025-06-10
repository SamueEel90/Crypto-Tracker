import React, { useEffect, useState } from 'react';
import { useAuthorization } from '../context/AuthorizationContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoryEntry {
  date: string;
  totalValueUSDC: number;
}

const PortfolioGraph: React.FC = () => {
  const { user } = useAuthorization();
  const [data, setData] = useState<HistoryEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.username) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/binance/portfolio/${user.username}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result: HistoryEntry[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data || data.length === 0) return <div>No portfolio data available.</div>;

  const labels = data.map(entry => entry.date);
  const values = data.map(entry => entry.totalValueUSDC);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Portfolio value (USDC)',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value (USDC)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

return (
  <div className="flex mx-7 my-4 bg-gray-800 rounded-md text-white">
   
    <div className="w-full max-w-6xl ">
    
      <div className="relative" style={{ height: '40vh', minHeight: '200px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  </div>
);
};

export default PortfolioGraph;
