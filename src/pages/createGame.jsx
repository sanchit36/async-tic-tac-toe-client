import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';

import Button from '../components/Button';
import Input from '../components/Input';
import { useSocket } from '../context/socket';
import styles from '../styles/pages/auth.module.css';

const createGame = (data) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/search`,
    data.body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};

const CreateGame = () => {
  const token = localStorage.getItem('token');
  const { socket } = useSocket();
  const navigate = useNavigate();
  const mutation = useMutation(createGame, {
    onSuccess: ({ data }) => {
      socket.emit('createGame', { opponent: data.user._id }, (game) => {
        navigate(`/games/${game._id}`);
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    mutation.mutate({
      body: { email },
      token,
    });
  };

  return (
    <>
      <p className={styles['subtitle']}>Start a new game</p>
      <h2 className={styles['title']}>Whom do you want to play with?</h2>

      <form onSubmit={handleSubmit} className={styles['form']}>
        <Input
          label="Email"
          type="email"
          placeholder="Type there email here"
          id="email"
        />

        <Button type="submit" disabled={mutation.isLoading}>
          Start Game
        </Button>
      </form>
    </>
  );
};

export default CreateGame;
