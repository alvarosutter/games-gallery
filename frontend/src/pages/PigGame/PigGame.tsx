import { useState } from 'react';
import { pigGame } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function PigGame() {
  const name = 'Pig-Game';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestScore: 0 });

  const game = {
    name,
    description:
      'Play the classic dice game: Pig. Roll the dice and add the result to your score. If you roll one it is game over!',
    logo: pigGame,
    color: '#ff914d',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default PigGame;
