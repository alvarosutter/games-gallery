import { useState } from 'react';
import { higherLower } from '../../assets/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import HigherLowerGame from './components/HigherLowerGame';
import Score from '../../types/score';
import { StartGameCover } from '../../components/ui/GameCover';

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
    return (
      <HigherLowerGame
        game={game}
        score={score as Score}
        setScore={setScore as React.Dispatch<React.SetStateAction<Score>>}
      />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default HigherLower;
