import { useState } from 'react';
import { memory } from '../../assets/icons';
import { StartGameCover } from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';
import Score from '../../types/score';

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
    return (
      <Game game={game} score={score as Score} setScore={setScore as React.Dispatch<React.SetStateAction<Score>>} />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default Memory;
