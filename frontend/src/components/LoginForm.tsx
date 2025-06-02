import React, {  useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from '../context/AuthorizationContext';


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
const { isAuthenticated, user, login } = useAuthorization();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/auth/login", {
        username: formData.usernameOrEmail,
        password: formData.password,
      });
      return res.data;
    },
    onSuccess: () => {
      alert("Login successful");
     navigate("/homePage");
     login({
        username: formData.usernameOrEmail, 
        email: formData.usernameOrEmail, 
      });
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || error.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="pt-50 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-110 h-150 outline-1 outline-gray-600 outline-offset-2"
      >
        <h1 className="text-4xl mb-4 text-twitter-blue">SCrypto</h1>
        <h1 className="text-4xl font-semibold mb-4 mt-8 text-white">Log in</h1>

        <div className="mb-4">
          <label
            htmlFor="usernameOrEmail"
            className="block text-sm font-medium text-twitter-blue pt-10"
          >
            Email/Username
          </label>
          <input
            type="text"
            placeholder="Enter email or username"
            id="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-twitter-blue"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          style={{ backgroundColor: "rgba(29, 155, 209, 1)" }}
          className="w-full text-white font-bold py-2 px-4 mt-4 rounded-md"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-amber-50 mt-3">or</p>

    

        <p className="text-twitter-blue pt-20 text-center rounded-md cursor-pointer">
          Create a SCrypto Account
        </p>
      {isAuthenticated && user ? (
        <p className="text-green-500 text-center mt-4">{user.username} is logged in</p>
      ) : (
        <p className="text-red-500 text-center mt-4">Not logged in</p>
      )}
      </form>
    </div>
  );
};

export default LoginForm;