import { useState, useEffect } from 'react';

import type { Card } from './memory.utils';
import { generateSet } from './memory.utils';
import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';
import ScoreText from '../../ui/Game/ScoreText';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function Memory({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const { counter: turns, increment: incrementTurns, reset: resetTurns } = useCounter(0);
  const [cards, setCards] = useState<Array<Card>>([]);
  const { counter: picks, increment: incrementPicks, reset: resetPicks } = useCounter(0);
  const { counter: pairs, increment: incrementPairs, reset: resetPairs } = useCounter(0);
  const [targets, setTargets] = useState<Array<EventTarget> & Array<HTMLButtonElement>>([]);

  async function startGame() {
    const randomSet = await generateSet();
    setCards([...randomSet]);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Disables the button
    e.currentTarget.disabled = true;
    if (picks < 2) {
      incrementPicks();
      targets.push(e.currentTarget);
      // Makes the card's front visible
      e.currentTarget.style.opacity = '1';
      if (picks === 1) {
        incrementTurns();
        const prevCard = targets[0];
        const currentCard = targets[1];
        if (prevCard.value === currentCard.value) {
          // If a pair is found makes them visible and disables them
          prevCard.style.opacity = '1';
          prevCard.disabled = true;
          e.currentTarget.disabled = true;
          incrementPairs();
        } else {
          // Makes the card invisible after some time and makes the buttons active again
          setTimeout(() => {
            prevCard.style.opacity = '0';
            currentCard.style.opacity = '0';
          }, 350);
          prevCard.disabled = false;
          currentCard.disabled = false;
        }
        // Resets the targets array and picks
        setTargets([]);
        resetPicks();

        // Checks if all the pairs have been found
        if (pairs === cards.length / 2 - 1) {
          if (turns < score.highestScore! || score.highestScore === -1) {
            setScore({ highestScore: turns });
          }
          resetPairs();
          setGameRunning(false);
        }
      }
    }
  }

  useEffect(() => {
    startGame();
  }, [gameRunning]);

  return (
    <>
      {gameRunning && (
        <section className="grid">
          {cards.map((card) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className="flex h-20 w-14 flex-col items-center justify-center rounded-lg border-4 border-[#7a7a7a] sm:h-24 sm:w-20"
              style={{ backgroundColor: game.color }}
            >
              <button
                className="h-full w-full bg-[#e7e6e6] text-3xl font-bold text-[#121212] opacity-0"
                type="button"
                onClick={(e) => {
                  handleClick(e);
                }}
                value={card}
              >
                {card}
              </button>
            </div>
          ))}
        </section>
      )}
      {!gameRunning && (
        <Closure
          onClick={() => {
            resetTurns();
            setGameRunning(true);
          }}
          color={game.color}
          score={score}
        >
          <ResultContainer>
            <ResultText text="you win!" color={game.color} />
            <ScoreText score={turns - 1} text="Turns" />
          </ResultContainer>
        </Closure>
      )}
    </>
  );
}
