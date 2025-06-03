import React, { useState , useRef } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthorization } from '../context/AuthorizationContext';

const WalletForm: React.FC = () => {
const { user } = useAuthorization();
const apiKeyRef = useRef<HTMLInputElement>(null);
const secretKeyRef = useRef<HTMLInputElement>(null);

const mutation = useMutation({
  mutationFn: async () => {
    const res = await axios.post('api/binance/walletData', {
      username: user?.username,
      apiKey: apiKeyRef.current?.value,
      apiSecret: secretKeyRef.current?.value
})

return res.data 

  },
  onSuccess: () => {
    if (apiKeyRef.current) 
      apiKeyRef.current.value = '';
    if (secretKeyRef.current) 
      secretKeyRef.current.value = '';
    },
  
});
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate();
 
}
return (

<div className=" bg-dark-gray">
  <form className="border-1 border-gray-600" onSubmit={handleSubmit} >
    
    <div className="text-white text-xl mb-4">
    <label className="block mb-2">API Key:</label>
    <input
      type="text"
      placeholder="your api key"
      ref={apiKeyRef}
      
    />
    
    </div>
    <div className="text-white text-xl mb-4">
    <label className="block mb-2">Secret Key:</label>
    <input type="text" placeholder="your secret key" ref={secretKeyRef}  />
    </div>
    <div className="text-white text-xl mb-4">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </form>
</div>
  )
} 
export default WalletForm;