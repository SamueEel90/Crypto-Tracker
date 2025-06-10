import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../context/AuthorizationContext";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuthorization();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Logging in with:", {
        username: formData.username,
        password: formData.password,
      });
      const res = await axios.post("/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

    
      localStorage.setItem("token", res.data.token);

      return res.data;
    },


onSuccess: (data) => {
  alert("Login successful");
  login(data.token, data.user); 
  navigate("/");
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
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-gray p-6 rounded-2xl shadow-md w-80 h-150 outline-1 outline-gray-600 outline-offset-2 md:w-100 md:h-160"
      >
        <h1 className="text-4xl mb-4 text-twitter-blue">SCrypto</h1>
        <h1 className="text-4xl font-semibold mb-4 mt-8 text-white">Log in</h1>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-twitter-blue pt-10"
          >
            Email/Username
          </label>
          <input
            type="text"
            placeholder="Enter email or username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border text-twitter-blue border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
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
            className="mt-1 block w-full border text-twitter-blue border-gray-600 rounded-md shadow-sm p-2 placeholder-gray-400"
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

        <button
          type="button"
          className="text-twitter-blue pt-20 w-full rounded-md cursor-pointer"
          onClick={() => navigate("/registerPage")}
        >
          Create a SCrypto Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
