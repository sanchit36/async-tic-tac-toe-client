import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useSocket } from "../context/socket";
import styles from "../styles/pages/auth.module.css";

const CreateGame = () => {
  const token = localStorage.getItem("token");
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        socket.emit("createGame", { opponent: data.user._id }, (game) => {
          navigate(`/games/${game._id}`);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className={styles["subtitle"]}>Start a new game</p>
      <h2 className={styles["title"]}>Whom do you want to play with?</h2>

      <form onSubmit={handleSubmit} className={styles["form"]}>
        <Input
          label="Email"
          type="email"
          placeholder="Type there email here"
          id="email"
        />

        <Button type="submit">Start Game</Button>
      </form>
    </>
  );
};

export default CreateGame;
