import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "./socket";

const gameContext = React.createContext();

export const useGame = () => React.useContext(gameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = React.useState([]);

  const { isSocketConnected, socket } = useSocket();

  const listGames = useCallback(({ games }) => {
    console.log(games);
    setGameState(games);
  }, []);

  useEffect(() => {
    if (isSocketConnected) {
      socket.emit("listGames", JSON.parse(localStorage.getItem("user"))?._id);
    }
  }, [socket, isSocketConnected]);

  useEffect(() => {
    if (isSocketConnected) {
      socket.on("listGames", listGames);
    }
    return () => {
      socket.off("listGames", listGames);
    };
  }, [isSocketConnected, listGames, socket]);

  return (
    <gameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </gameContext.Provider>
  );
};
