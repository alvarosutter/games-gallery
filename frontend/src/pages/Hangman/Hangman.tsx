import { useState } from 'react';
import { hangman } from '../../assets/icons';
import GameCover from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';

function Hangman() {
  const name = 'Hangman';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-score`, { win: 0, lost: 0 });

  const game = {
    name,
    description:
      'Play the classic guest game Hangman. Try to guest the country, but be careful, six wrong guesses and is GAME OVER!',
    logo: hangman,
    color: '#c0c0c0',
  };

  if (gameRunning) {
    return <Game game={game} score={score as object} setScore={setScore as () => void} />;
  }
  return <GameCover onClick={() => setGameRunning(true)} game={game} buttonText="Play Game" score={score as object} />;
}

export default Hangman;
