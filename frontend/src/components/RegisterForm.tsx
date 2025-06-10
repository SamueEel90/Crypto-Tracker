import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await axios.post("/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

    
      localStorage.setItem("token", res.data.token);
      return res.data;
    },
    onSuccess: () => {
      alert("Registration successful");
      navigate("/loginPage");
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };


  return (
    <div className=" flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-gray p-6 rounded-2xl shadow-md w-80 h-150 outline-1 outline-gray-600 outline-offset-2 md:w-100 md:h-160"
      >
        <h1 className="text-4xl mb-4 text-twitter-blue">SCrypto</h1>
        <h1 className="text-4xl font-semibold mb-4 mt-8 text-white">Create Account</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-twitter-blue pt-10">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-twitter-blue">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-twitter-blue">
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-twitter-blue">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            value={formData.confirmPassword}
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
          {mutation.isPending ? "Registering..." : "Register"}
        </button>

      
      </form>
    </div>
  );
};

export default RegisterForm;
