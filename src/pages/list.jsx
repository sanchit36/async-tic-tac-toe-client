import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import GameCard from "../components/GameCard";
import { useGame } from "../context/game";
import styles from "../styles/pages/list.module.css";

import { ReactComponent as PlusIcon } from "../assets/Plus.svg";

const List = () => {
  const { gameState: games } = useGame();
  const navigate = useNavigate();

  return (
    <>
      {games.length === 0 && (
        <div className={styles["no-data-container"]}>
          <p className={styles["not-found-title"]}>No Games Found</p>
          <Button onClick={() => navigate("/create")}>Start a new Game</Button>
        </div>
      )}

      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}

      <button
        className={styles["float-btn"]}
        onClick={() => navigate("/create")}
      >
        <PlusIcon /> New Game
      </button>
    </>
  );
};

export default List;
