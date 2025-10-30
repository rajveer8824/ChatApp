import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import defaultProfile from "../../../public/user.jpg"; // Default profile picture

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 cursor-pointer items-center">
        <div className="relative">
          {/* Profile Picture */}
          <img
            src={user.profilePicture || defaultProfile} // Use user's profile picture or fallback to default
            alt={user.fullname}
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Online Status Indicator */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <h1 className="font-bold text-white">{user.fullname}</h1>
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;