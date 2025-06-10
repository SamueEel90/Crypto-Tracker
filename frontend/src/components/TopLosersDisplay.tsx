
import clsx from "clsx";
import { useFetchTopLosers } from "../features/CoinGecko";
import { useEffect } from "react";

const TopLosersDisplay = () => {
  const { refetch, data } = useFetchTopLosers();

  // useEffect( () =>{
  //   const interval = setInterval(()=> {
  //     refetch()
  //   },1000)
  //   return () => clearInterval(interval);
  // },[])


  return (
    <div className="mt-10 mb-10 min-w-[250px] w-[400px]">
      <div className="border-1 border-gray-600 rounded-xl p-4 bg-dark-gray">
        <div className="grid grid-cols-2 border-b-1 border-gray-600 pb-2">
          <p className="text-amber-50 ">Top Losers</p>
          <span className="text-right text-amber-50  cursor-pointer hover:underline">More &rarr;</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {data?.map((crypto) => (
            <div key={crypto.name} className="contents">
              <div className="flex gap-2" >
              <img
                src={crypto.image}  
                alt={crypto.name}
                className="w-4 h-4 mt-1 rounded-full"
              />
              <div className="text-amber-50">{crypto.symbol.toUpperCase()}</div></div>
              <div className="text-amber-50">${crypto.current_price}</div>
              <div className={clsx({
                'text-green-500': crypto.price_change_percentage_24h >= 0,
                'text-red-500': crypto.price_change_percentage_24h < 0
                })}>{crypto.price_change_percentage_24h.toFixed(2)}%</div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopLosersDisplay;
