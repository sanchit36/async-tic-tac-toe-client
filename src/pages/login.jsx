import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useSnackbar } from "../context/snackbar";
import { useSocket } from "../context/socket";
import styles from "../styles/pages/auth.module.css";

const Login = () => {
  const { connectSocket } = useSocket();
  const snackbarCtx = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const user = { username, password };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        connectSocket(data.user._id);
        snackbarCtx.displayMsg("Welcome back!");
      } else {
        snackbarCtx.displayMsg("Enter valid credentials", "red");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className={styles["subtitle"]}>Login</p>
      <h2 className={styles["title"]}>Please enter your details</h2>

      <form onSubmit={handleSubmit} className={styles["form"]}>
        <Input
          label="Username"
          type="text"
          id="username"
          placeholder="Type your username here"
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Type your password here"
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default Login;
