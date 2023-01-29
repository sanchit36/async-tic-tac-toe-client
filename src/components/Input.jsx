import React from "react";
import styles from "../styles/components/input.module.css";

const Input = ({ label, id, ...props }) => {
  return (
    <div className={styles["form-control"]}>
      <label htmlFor={id} className={styles["label"]}>
        {label}
      </label>
      <input id={id} {...props} className={styles["input"]} />
    </div>
  );
};

export default Input;
