import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/pages/index.module.css";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <div className={styles["headingContainer"]}>
        <h3 className={styles["headingSmall"] + " mb-24"}>async</h3>
        <h1 className={styles["heading"]}>tic tac toe</h1>
      </div>

      <div className={styles["btn-group"]}>
        <Button
          className={"mb-24"}
          color="blue"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </div>
  );
};

export default Index;
