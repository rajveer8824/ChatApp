import React, { useState } from 'react';
import { HiOutlineLogin } from "react-icons/hi";
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure Cookies is imported


function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Send logout request to the backend
      await axios.post('/api/user/logout', {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      // Clear local storage and cookies
      localStorage.removeItem('Chatify');
      Cookies.remove('jwt');

      setLoading(false);
      alert("Logout successful");
      // Optionally redirect the user to the login page
      window.location.reload(); // Reload the page to reflect the logout
    } catch (error) {
      console.error('Logout failed:', error);
      setLoading(false);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="absolute bottom-4 left-4">
      <button
        className={`flex items-center justify-center p-2 text-white rounded-full transition duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-red-700'
        }`}
        onClick={handleLogout}
        disabled={loading} // Disable button while loading
      >
        <HiOutlineLogin className="w-6 h-6" />
        {loading ? 'Logging out...' : ''}
      </button>
    </div>
  );
}

export default Logout;