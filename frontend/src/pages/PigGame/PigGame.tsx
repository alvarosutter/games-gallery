import { useState } from 'react';

import Game from './components/Game';
import { pigGame } from '../../assets/icons';
import { StartGameCover } from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import type Score from '../../types/score';

function PigGame() {
  const name = 'Pig-Game';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { highestScore: 0 });

  const game = {
    name,
    description:
      // eslint-disable-next-line max-len
      'Play the classic dice game: Pig. Roll the dice and add the result to your score. If you roll one it is game over!',
    logo: pigGame,
    color: '#ff914d',
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

export default PigGame;
