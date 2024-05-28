import { useState } from 'react';

import Game from './components/Game';
import { simongame } from '../../assets/icons';
import { StartGameCover } from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import type Score from '../../types/score';

function SimonGame() {
  const name = 'Simon-Game';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestLevel: 0 });

  const game = {
    name,
    description:
      // eslint-disable-next-line max-len
      "Play the famous 80's game: Simon Game. Watch the sequence and then click the buttons in the right order. See if you can reach level. 15 and win the game!",
    logo: simongame,
    color: '#FF5757',
  };

  if (gameRunning) {
    return (
      <Game
        game={game}
        score={score as Score}
        setScore={setScore as React.Dispatch<React.SetStateAction<Score>>}
      />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default SimonGame;
