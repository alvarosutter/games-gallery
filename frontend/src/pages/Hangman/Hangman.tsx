import { useState } from 'react';
import { hangman } from '../../assets/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/HangmanGame';
import { StartGameCover } from '../../components/ui/GameCover';
import Score from '../../types/score';

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
    return (
      <Game game={game} score={score as Score} setScore={setScore as React.Dispatch<React.SetStateAction<Score>>} />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default Hangman;
