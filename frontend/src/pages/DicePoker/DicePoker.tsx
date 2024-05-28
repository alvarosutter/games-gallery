import { useState } from 'react';

import DicePokerGame from './components/DicePokerGame';
import { dicePoker } from '../../assets/icons';
import { StartGameCover } from '../../components/ui/GameCover';
import useLocalStorage from '../../hooks/useLocalStorage';
import type Score from '../../types/score';

function DicePoker() {
  const name = 'Dice-Poker';
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useLocalStorage(`${name}-Score`, { win: 0, draw: 0, lost: 0 });

  const game = {
    name,
    description:
      'Play a simple version of poker against our computer. There are not bets, just roll 5 dices and test your luck!',
    logo: dicePoker,
    color: ' #c9b07d',
  };

  if (gameRunning) {
    return (
      <DicePokerGame
        game={game}
        score={score as Score}
        setScore={setScore as React.Dispatch<React.SetStateAction<Score>>}
      />
    );
  }

  return <StartGameCover game={game} score={score as Score} onClick={() => setGameRunning(true)} />;
}

export default DicePoker;
