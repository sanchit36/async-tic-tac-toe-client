import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/game-card.module.css';
import Button from './Button';

const GameCard = ({ game }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const opponent = game.players.filter((p) => p._id !== user._id)?.[0];
  const isFirstTurn = game.board.every((val) => val === null);
  let infoText = '';
  if (game.status === 'finished') {
    infoText = game.winner
      ? game.winner === user._id
        ? 'You Won!'
        : 'You Lost!'
      : "It's a Draw!";
  } else if (isFirstTurn) {
    infoText =
      game.turn === user._id
        ? `You've started a new game with ${opponent?.name}. <br/> It's your turn to play.`
        : `${opponent?.name} has started a new game with you. <br/> Waiting for them.`;
  } else {
    infoText =
      game.turn === user._id
        ? `${opponent?.name} just made their move! <br/> It's your turn to play now.`
        : `You've made your move! <br/> Waiting for them.`;
  }

  return (
    <div className={styles['card']}>
      <h2 className={styles['card-title']}>Game With {opponent?.name}</h2>
      <p
        className={styles['card-text']}
        dangerouslySetInnerHTML={{ __html: infoText }}
      />
      <p className={styles['card-date']}>
        {new Date(game.updatedAt).toUTCString()}
      </p>
      <Button
        size="small"
        onClick={() => {
          navigate(`${game._id}`);
        }}
      >
        {game.status === 'finished' ? 'View Game' : 'Play!'}
      </Button>
    </div>
  );
};

export default GameCard;
