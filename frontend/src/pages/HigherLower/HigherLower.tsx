import { useState } from 'react';
import { higherLower } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function HigherLower() {
  const name = 'Higher-Lower';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestScore: 0 });

  const game = {
    name,
    description:
      'Play the Higher or Lower guest game against our computer. Pick if the next card will be higher or lower than the current one and test your luck!',
    logo: higherLower,
    color: ' #7ed957',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default HigherLower;
