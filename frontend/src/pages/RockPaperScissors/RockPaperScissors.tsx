import { useState } from 'react';
import { rockPaperScissors } from '../../assets/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import Game from './components/Game';
import Score from '../../types/score';
import { StartGameCover } from '../../components/ui/GameCover';

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
    return (
      <Game game={game} score={score as Score} setScore={setScore as React.Dispatch<React.SetStateAction<Score>>} />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default RockPaperScissors;
