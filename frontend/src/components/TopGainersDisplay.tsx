
import { useFetchAllCryptos } from "../features/CoinGecko";

const TopGainersDisplay = () => {
  const { data, error, } = useFetchAllCryptos();

  return (
    <div className="mt-10">
      <div className="border-1 border-gray-600 min-w-[100px] w-[400px]">
        <div className="grid grid-cols-2 min-w-[100px] w-[400px]">
          <p className="text-amber-50">Top Gainers</p>
          <p className="text-amber-50 text-right">More</p>
        </div>
        <div className="grid grid-cols-3 min-w-[100px] w-[400px] gap-2 mt-2">
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
