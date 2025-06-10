import axios from 'axios';


export const fetchUserEmail = async (username: string) => {
  const response = await axios.get(`/api/auth/email/${username}`);
  return response.data;
};
