import React from "react";
import styles from "../styles/components/button.module.css";

const Button = ({
  children,
  color = "yellow",
  size = "large",
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles["btn"]} ${
        color === "blue" ? styles["btnBlue"] : ""
      } ${size === "small" ? styles["btnSmall"] : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
