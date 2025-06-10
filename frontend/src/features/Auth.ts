import { useQuery } from '@tanstack/react-query';
import { fetchUserEmail } from '../api/user';



export const useFetchUserEmail = (username: string | undefined) => 
  useQuery({
    queryKey: ['user-email', username],
    queryFn: () => fetchUserEmail(username!),
    enabled: !!username,
  });
