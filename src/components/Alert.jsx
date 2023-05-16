import React from "react";
import styles from "../styles/components/alert.module.css";

const Alert = ({ text, color = "yellow" }) => {
  return (
    <div className={styles["alert"] + " " + styles["alert-" + color]}>
      {text}
    </div>
    <div className={styles["alert"] + " " + styles["alert-" + color]}>
      {text}
     </div>
  );
};

export default Alert;
