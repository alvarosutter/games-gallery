import { useState } from 'react';
import { dicePoker } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function DicePoker() {
  const name = 'Dice-Poker';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { win: 0, draw: 0, lost: 0 });

  const game = {
    name,
    description:
      'Play a simple version of poker against our computer. There are not bets, just roll 5 dices and test your luck!',
    logo: dicePoker,
    color: ' #c9b07d',
  };

  if (gameRunning) {
    return <Game game={game} score={score} setScore={setScore} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score} />;
}

export default DicePoker;
