import React from "react";

function Message({ message }) {
  // Retrieve the authenticated user from localStorage
  const authUser = JSON.parse(localStorage.getItem("Chatify")) || {};
  const itsMe = message.senderId === authUser?.user?._id; // Check if the message is sent by the authenticated user

  // Determine alignment and color based on the sender
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-500";

  // Format the message timestamp
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer text-gray-400 text-xs">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;