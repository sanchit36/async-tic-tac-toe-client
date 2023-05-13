import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../context/game';
import { useSocket } from '../context/socket';
import styles from '../styles/pages/game.module.css';

import { ReactComponent as XIcon } from '../assets/X.svg';
import { ReactComponent as OIcon } from '../assets/O.svg';
import { ReactComponent as XSmallIcon } from '../assets/XSmall.svg';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { useSnackbar } from '../context/snackbar';

const Game = () => {
  const [game, setGame] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const snackbarCtx = useSnackbar();
  const { gameState: games } = useGame();
  const { socket } = useSocket();
  const { gameId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const game = games?.find((g) => g._id === gameId);
    setGame(game);
  }, [gameId, games]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const opponent = game.players.filter((p) => p._id !== user._id)?.[0];

  let alert = {
    text: '',
    color: '',
  };

  if (game.status === 'finished') {
    if (game.winner) {
      alert.text = game.winner === user._id ? 'You won!' : 'You lost!';
      alert.color = game.winner === user._id ? 'green' : 'red';
    } else {
      alert.text = "It's a draw!";
      alert.color = 'yellow';
    }
  } else {
    alert.text = game.turn === user._id ? 'Your move' : 'Their move';
    alert.color = 'yellow';
  }

  const handleMove = () => {
    if (game.turn !== user._id) {
      snackbarCtx.displayMsg("It's not your turn", 'red');
      return;
    }
    if (index === null) {
      snackbarCtx.displayMsg('Please put your marker', 'red');
      return;
    }

    socket.emit('move', { gameId: game._id, index }, (error) => {
      snackbarCtx.displayMsg(error, 'red');
    });
    setIndex(null);
  };

  const handleReset = () => {
    socket.emit('reset', { gameId: game._id }, (error) => {
      snackbarCtx.displayMsg(error, 'red');
    });
  };

  return (
    <>
      <h1 className={styles['title']}>Game With {opponent?.name}</h1>
      <p className={styles['subtitle']}>Your piece</p>
      <div className="mb-8">
        <XSmallIcon />
      </div>

      {alert && <Alert {...alert} />}

      <div className={styles['grid']}>
        {game.board.map((cell, i) => {
          return (
            <button
              key={i}
              className={styles['cell']}
              onClick={() => setIndex(i)}
              disabled={
                !!cell || game.status === 'finished' || game.turn !== user._id
              }
            >
              {cell === null ? (
                i === index ? (
                  <XIcon />
                ) : (
                  ' '
                )
              ) : cell === user._id ? (
                <XIcon />
              ) : (
                <OIcon />
              )}
            </button>
          );
        })}
      </div>

      {game.status === 'finished' ? (
        <Button onClick={handleReset} className={'mt-auto'}>
          Reset Game
        </Button>
      ) : (
        <Button
          onClick={handleMove}
          disabled={game.turn !== user._id}
          className={'mt-auto'}
        >
          {game.turn === user._id ? 'Submit!' : 'Wait for opponent'}
        </Button>
      )}
    </>
  );
};

export default Game;
