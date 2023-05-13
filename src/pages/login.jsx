import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';
import { useSnackbar } from '../context/snackbar';
import { useSocket } from '../context/socket';
import styles from '../styles/pages/auth.module.css';

const loginUser = (user) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
    user
  );
};

const Login = () => {
  const { connectSocket } = useSocket();
  const snackbarCtx = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(loginUser, {
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      connectSocket(data.user._id);
      queryClient.invalidateQueries('user');
      snackbarCtx.displayMsg('Welcome back!');
    },
    onError: () => {
      snackbarCtx.displayMsg('Enter valid credentials', 'red');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const user = { username, password };
    mutation.mutate(user);
  };

  return (
    <>
      <p className={styles['subtitle']}>Login</p>
      <h2 className={styles['title']}>Please enter your details</h2>

      <form onSubmit={handleSubmit} className={styles['form']}>
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
        <Button type="submit" disabled={mutation.isLoading}>
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
