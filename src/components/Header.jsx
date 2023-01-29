import React from "react";
import useGoBack from "../hooks/useGoBack";
import styles from "../styles/components/header.module.css";
import { ReactComponent as BackIcon } from "../assets/Back.svg";
import { useLocation } from "react-router-dom";

const Header = ({ fallback, logout }) => {
  const goBack = useGoBack(fallback);
  const location = useLocation();

  return (
    <div className={styles["header"]}>
      {location.pathname !== "/" && location.pathname !== "/games" && (
        <button onClick={goBack} className={styles["header-btn"]}>
          <BackIcon />
        </button>
      )}
      {location.pathname === "/games" && (
        <h2 className={styles["header-title"]}>Your Games</h2>
      )}

      {logout && (
        <button className={styles["header-btn"]} onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
