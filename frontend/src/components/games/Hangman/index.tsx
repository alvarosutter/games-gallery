import { useEffect, useRef, useState } from 'react';

import generateWord from './hangman.utils';
import HangmanBody from './HangmanBody';
import Word from './Word';
import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function Hangman({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState('');
  const {
    counter: lives,
    decrement: decrementLives,
    reset: resetLives,
    add: addLives,
  } = useCounter(6);
  const { counter: turns, increment: incrementTurns, reset: resetTurns } = useCounter(0);
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);
  const [word, setWord] = useState(generateWord());
  const [guesses, setGuesses] = useState<Array<string>>([]);
  const guessRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guess = guessRef.current?.value;

    guesses.push(guess!.toUpperCase());
    incrementTurns();

    if (!word.includes(guess!.toUpperCase())) {
      decrementLives();
      if (lives === 1) {
        setGameRunning(false);
        setResult('You lose!');
        incrementLost();
      }
    }

    /** Returns true if all the letters of the word are present in the guesses */
    const check = word
      .split('')
      .filter((letter) => letter !== ' ')
      .every((letter) => guesses.includes(letter));
    if (check) {
      setResult('You win!');
      incrementWin();
      setGameRunning(false);
    }

    event.currentTarget.reset();
  };

  const handlePlayAgain = () => {
    setGuesses([]);
    setWord(generateWord());
    resetLives();
    resetTurns();
    addLives(6);
    setGameRunning(true);
  };

  useEffect(() => {
    setScore({ win, lost });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win, lost]);

  return (
    <section className="m-auto flex w-full flex-col items-center justify-center gap-x-4 gap-y-8">
      {!gameRunning && (
        <ResultContainer>
          <ResultText color={game.color} text={result} />
        </ResultContainer>
      )}
      {(gameRunning || result === 'You lose!') && (
        <div className="mb-6 flex items-center justify-center">
          <HangmanBody lives={lives} />
        </div>
      )}
      <Word word={word} guesses={guesses} gameRunning={gameRunning} />
      {gameRunning && (
        <>
          <div className="mt-8 flex flex-row flex-wrap content-center items-center justify-center">
            <form
              className="mt-6 flex flex-row flex-wrap content-center items-center justify-center"
              onSubmit={submitHandler}
            >
              <label className="flex items-center justify-center gap-4 font-light" htmlFor="wInput">
                {'Guess: '}
                <input
                  className="h-14 w-14 rounded-lg border-2 border-[#c0c0c0] bg-[#ffffffec] text-center text-2xl uppercase text-[#121212]"
                  id="wInput"
                  ref={guessRef}
                  type="text"
                  maxLength={1}
                  required
                />
              </label>
              <button
                className="w-36 rounded-lg p-3 text-lg font-bold text-[#121212]"
                style={{ margin: '20px', backgroundColor: `${game.color}` }}
                type="submit"
              >
                Enter
              </button>
            </form>
          </div>
          <div className="flex flex-row flex-wrap content-center items-center justify-center gap-x-8 gap-y-4">
            <p style={{ display: 'none' }}>{`Turns: ${turns}`}</p>
            <p className="text-center font-light">
              {guesses.map((g, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={g + i}>{`${g} `}</span>
              ))}
            </p>
          </div>
        </>
      )}
      {!gameRunning && (
        <Closure onClick={handlePlayAgain} color={game.color} score={score}>
          {' '}
        </Closure>
      )}
    </section>
  );
}
