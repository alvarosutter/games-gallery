import Image from 'next/image';
import { useState } from 'react';

import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import PlayButton from '../../ui/Game/PlayButton';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';
import ScoreText from '../../ui/Game/ScoreText';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function PigGame({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const { counter, reset, add } = useCounter();
  const [dice, setDice] = useState(0);

  function roll() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);

    if (randomNumber !== 1) {
      add(randomNumber);
    }

    if (randomNumber === 1) {
      setGameRunning(false);
    }

    if (counter > score.highestScore!) {
      setScore({ highestScore: counter });
    }
  }

  const handlePlayAgain = () => {
    reset();
    setDice(0);
    setGameRunning(true);
  };

  return (
    <>
      {gameRunning && (
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            style={!dice ? { opacity: '0' } : {}}
            src={`/dices/dice-${dice}.png`}
            alt={dice.toString()}
            width={150}
            height={150}
          />
          <ScoreText score={counter} />
          <PlayButton
            text="Roll Dice"
            onClick={() => {
              roll();
            }}
            color={game.color}
          />
        </div>
      )}
      {!gameRunning && (
        <Closure onClick={handlePlayAgain} color={game.color} score={score}>
          <ResultContainer>
            <ResultText text="game over!" color={game.color} />
            <ScoreText score={counter} />
            <Image src={`/dices/dice-${dice}.png`} alt={dice.toString()} width={150} height={150} />
          </ResultContainer>
        </Closure>
      )}
    </>
  );
}
