import { useQuery } from '@tanstack/react-query';
import { fetchTopPrices } from '../api/binance';
import type { BinanceTicker24h } from '../types/BinanceTicker24h';

export const useBinanceTicker24h = () => 
  useQuery<BinanceTicker24h[]>({
    queryKey: ['binance'],
    queryFn: () => fetchTopPrices(),
  });