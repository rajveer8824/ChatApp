import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/Authprovider.jsx';

function Login() {
  const { authUser, setAuthUser } = useAuth(); // Use the custom hook
  const [apiError, setApiError] = useState(null); // State to handle API errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Debugging

    // Prepare user data for the API request
    const userinfo = {
      email: data.Email,
      password: data.Password,
    };

    console.log("Sending User Info:", userinfo); // Debugging

    try {
      // Send POST request to the backend
      const res = await axios.post('/api/user/login', userinfo, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log("Response:", res.data); // Debugging
      alert("Login successful");
      setApiError(null); // Clear any previous errors
      localStorage.setItem('Chatify', JSON.stringify(res.data));
      setAuthUser(res.data); // Set the authenticated user in context
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Debugging
      if (error.response) {
        setApiError(error.response.data.message || "An error occurred during login.");
      } else {
        setApiError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-96 space-y-3 transition-transform transform hover:scale-105"
      >
        <h1 className="text-4xl font-bold text-center text-white">Chatify</h1>
        <h2 className="text-2xl font-semibold text-left text-green-600">Login</h2>

        {/* Email */}
        <label className="block">
          <input 
            type="email" 
            placeholder="mail@site.com"
            className="w-full px-4 py-3 text-sm rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200 ease-in-out"
            {...register("Email", { required: "Email is required" })} 
          />
        </label>
        {errors.Email && <span className="text-red-500">{errors.Email.message}</span>}

        {/* Password */}
        <label className="block">
          <input 
            type="password" 
            placeholder="Enter password" 
            className="w-full px-4 py-3 text-sm rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200 ease-in-out"
            {...register("Password", { required: "Password is required" })}
          />
        </label>
        {errors.Password && <span className="text-red-500">{errors.Password.message}</span>}

        {/* API Error */}
        {apiError && <p className="text-red-500 text-center">{apiError}</p>}

        {/* Login Button */}
        <div className="text-center">
          <button 
            type="submit"   
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-200 ease-in-out active:scale-95 shadow-md"
          >
            Login
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-400 text-sm">
          New user?
          <a href="/signup" className="text-green-500 hover:underline ml-1">Signup</a>
        </p>
      </form>
    </div>
  );
}

export default Login;