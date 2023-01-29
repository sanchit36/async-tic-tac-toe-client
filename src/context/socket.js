import React from "react";
import { useCallback } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_BACKEND_URL, {
  autoConnect: false,
});

const SocketContext = React.createContext();

export const useSocket = () => {
  return React.useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [isSocketConnected, setIsSocketConnected] = React.useState(false);

  function connectUser(userId) {
    if (!userId) return;
    socket.emit("userConnected", userId);
  }

  function disconnectUser(userId) {
    if (!userId) return;
    socket.emit("userDisconnected", userId);
  }

  const connectSocket = useCallback((userId) => {
    setIsSocketConnected(true);
    socket.connect();
    connectUser(userId);
  }, []);

  const disconnectSocket = useCallback((userId) => {
    socket.removeAllListeners("connect");
    setIsSocketConnected(false);
    disconnectUser(userId);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, isSocketConnected, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
