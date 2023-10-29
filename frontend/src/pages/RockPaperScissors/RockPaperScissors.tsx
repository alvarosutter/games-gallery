import { useState } from 'react';
import { rockPaperScissors } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function RockPaperScissors() {
  const name = 'Rock-Paper-Scissors';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-score`, { win: 0, draw: 0, lost: 0 });

  const game = {
    name,
    description:
      'Play the classic game of Rock-Paper-Scissors against our computer. Pick one of the options and test your luck!',
    logo: rockPaperScissors,
    color: '#38b6ff',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default RockPaperScissors;
