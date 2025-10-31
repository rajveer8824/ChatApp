import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/Authprovider.jsx';
import { Link } from 'react-router-dom';

function Signup() {
  const [apiError, setApiError] = useState(null); // State to handle API errors
  const { setAuthUser } = useAuth(); // Use the custom hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Debugging

    // Check if passwords match
    if (data.Password !== data.ConfirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    // Prepare user data for the API request
    const userinfo = {
      fullname: data.fullname,
      email: data.Email,
      password: data.Password,
    };

    console.log("Sending User Info:", userinfo); // Debugging

    try {
      // Send POST request to the backend
      const res = await axios.post('/api/user/signup', userinfo,{
        withCredentials: true, 
      });
      console.log("Response:", res.data); // Debugging
      alert("Signup successfully");
      setApiError(null); // Clear any previous errors
      localStorage.setItem('Chatify', JSON.stringify(res.data));
      setAuthUser(res.data); // Set the authenticated user in context
    } catch (error) {
      console.error("Error:", error); // Debugging
      if (error.response) {
        setApiError(error.response.data.message || "An error occurred during signup.");
      } else {
        setApiError("An error occurred. Please try again.");
      }
    }
  };

  // Watch the password field to validate against it
  const password = watch('Password');

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-96 space-y-3 transition-transform transform hover:scale-105"
      >
        <h1 className="text-4xl font-bold text-center text-white">Chatify</h1>
        <h2 className="text-2xl font-semibold text-left text-green-600">Sign Up</h2>

        {/* Fullname */}
        <label className="block">
          <input 
            type="text" 
            placeholder="Enter Fullname" 
            className="w-full px-4 py-3 text-sm rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200 ease-in-out"
            {...register("fullname", { required: "Full name is required" })}
          />
        </label>
        {errors.fullname && <span className="text-red-500">{errors.fullname.message}</span>}

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
    {...register("Password", { 
      required: "Password is required", 
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long"
      },
      validate: {
        hasNumber: value => /\d/.test(value) || "Password must include at least one number",
        hasLetter: value => /[a-zA-Z]/.test(value) || "Password must include at least one letter"
      }
    })}
  />
</label>
{errors.Password && <span className="text-red-500">{errors.Password.message}</span>}
        {/* Confirm Password */}
        <label className="block">
          <input 
            type="password" 
            placeholder="Confirm password" 
            className="w-full px-4 py-3 text-sm rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200 ease-in-out"
            {...register("ConfirmPassword", { 
              required: "Please confirm your password", 
              validate: value => value === password || "Passwords do not match" 
            })}
          />
        </label>
        {errors.ConfirmPassword && <span className="text-red-500">{errors.ConfirmPassword.message}</span>}

        {/* API Error */}
        {apiError && <p className="text-red-500 text-center">{apiError}</p>}

        {/* Signup Button */} 
        <div className="text-center">
          <button 
            type="submit" 
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-200 ease-in-out active:scale-95 shadow-md"
          >
            Sign Up
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account? 
          <Link to="/login"
          href="#" className="text-green-500 hover:underline ml-1">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;