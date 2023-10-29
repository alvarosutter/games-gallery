import { useState } from 'react';
import { memory } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function Memory() {
  const name = 'Memory';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestScore: undefined });

  const game = {
    name,
    description:
      'Play a round of memory. Pick one of the 12 cards and try to find the match. See how quick can you find all the pairs!',
    logo: memory,
    color: '#FFDE59',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default Memory;
