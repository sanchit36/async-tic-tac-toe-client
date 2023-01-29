import React from "react";
import { useSnackbar } from "../context/snackbar";
import styles from "../styles/components/snackbar.module.css";

const Snackbar = ({ color }) => {
  const snackbarCtx = useSnackbar();

  return (
    <div
      className={
        styles["snackbar-container"] +
        " " +
        styles["snackbar-" + snackbarCtx.color]
      }
    >
      <div className={styles["snackbar-label"]}>{snackbarCtx.msg}</div>
      <div className={styles["snackbar-dismiss"]} onClick={snackbarCtx.onClose}>
        &times;
      </div>
    </div>
  );
};

export default Snackbar;
