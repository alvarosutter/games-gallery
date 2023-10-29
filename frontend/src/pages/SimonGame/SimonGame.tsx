import { useState } from 'react';
import { simongame } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function SimonGame() {
  const name = 'Simon-Game';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestLevel: 0 });

  const game = {
    name,
    description:
      "Play the famous 80's game: Simon Game. Watch the sequence and then click the buttons in the right order. See if you can reach level. 15 and win the game!",
    logo: simongame,
    color: '#FF5757',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default SimonGame;
