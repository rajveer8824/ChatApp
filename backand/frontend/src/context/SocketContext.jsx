import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider.jsx";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth(); // Correctly destructure authUser

  useEffect(() => {
    const backendURL =
    process.env.NODE_ENV === "production"
      ? "https://chatify-uw44.onrender.com" // your deployed backend on Render
      : "http://localhost:4000";            // local backend

  if (authUser?.user?._id) {
    const socket = io(backendURL, {
      transports: ["websocket"], // ✅ ensures Render works (prevents CORS/polling issues)
      query: {
        userId: authUser.user._id,
      },
    });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser?.user?._id]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};