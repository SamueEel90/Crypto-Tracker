
import { useFetchTopGainers } from "../features/CoinGecko";

const TopGainersDisplay = () => {
  const { data, error } = useFetchTopGainers();

  return (
    <div className="mt-10 mb-10 min-w-[250px] w-[400px]">
      <div className="border-1 border-gray-600 rounded-lg p-4 bg-dark-gray">
        <div className="grid grid-cols-2 border-b-2 border-gray-600 pb-2">
          <p className="text-amber-50 ">Top Gainers</p>
          <span className="text-right text-amber-50  cursor-pointer hover:underline">More &rarr;</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {data?.map((crypto) => (
            <div key={crypto.name} className="contents">
              <div className="text-amber-50">{crypto.name}</div>
              <div className="text-amber-50">${crypto.current_price}</div>
              <div className="text-green-500">{crypto.price_change_percentage_24h}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGainersDisplay;
