/* eslint-disable jsx-a11y/control-has-associated-label */
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';
import ScoreText from '../../ui/Game/ScoreText';

type Color = 'red' | 'green' | 'yellow' | 'blue';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function SimonGame({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState(false);
  const { counter, increment, reset } = useCounter();
  const colors: Array<Color> = ['red', 'green', 'yellow', 'blue'];
  const [simonSequence, setSimonSequence] = useState<Array<Color>>([]);
  const [playingIndex, setPlayingIndex] = useState(0);

  const redRef = useRef<HTMLButtonElement>(null);
  const greenRef = useRef<HTMLButtonElement>(null);
  const yellowRef = useRef<HTMLButtonElement>(null);
  const blueRef = useRef<HTMLButtonElement>(null);

  function addNextColor() {
    const next = colors[Math.floor(Math.random() * colors.length)];
    const sequence = [...simonSequence, next];
    setSimonSequence(sequence);
  }

  /** Highlights the buttons in the sequence */
  function highlightButton(index = 0) {
    const animationDelay = 400;
    const animationDuration = 250;
    let ref: RefObject<HTMLButtonElement> | null = null;
    if (simonSequence[index] === 'red') ref = redRef;
    if (simonSequence[index] === 'green') ref = greenRef;
    if (simonSequence[index] === 'yellow') ref = yellowRef;
    if (simonSequence[index] === 'blue') ref = blueRef;

    setTimeout(() => {
      if (ref !== null && ref.current !== null) ref.current.style.filter = 'brightness(2)';
      setTimeout(() => {
        if (ref !== null && ref.current !== null) ref.current.style.filter = 'brightness(1)';
        if (index < simonSequence.length - 1) highlightButton(index + 1);
      }, animationDuration);
    }, animationDelay);
  }

  function checkInput(clickColor: Color) {
    if (gameRunning) {
      setTimeout(() => {
        if (simonSequence[playingIndex] === clickColor) {
          if (playingIndex === simonSequence.length - 1) {
            setTimeout(() => {
              setPlayingIndex(0);
              if (counter === 14) {
                setResult(true);
                setGameRunning(false);
              }
              increment();
              addNextColor();
            }, 250);
          } else {
            setPlayingIndex(playingIndex + 1);
          }
        } else {
          if (simonSequence.length > score.highestLevel!) {
            setScore({ highestLevel: counter });
          }
          setGameRunning(false);
        }
      }, 250);
    }
  }

  /** Picks the first color when the game starts */
  useEffect(() => {
    addNextColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRunning]);

  /** Highlights the button(s) every time the sequence change */
  useEffect(() => {
    if (simonSequence.length > 0) highlightButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simonSequence]);

  return (
    <>
      {gameRunning && (
        <section className="m-auto flex flex-col items-center justify-center gap-6">
          <p className="mb-6 text-4xl">{`LEVEL ${counter}`}</p>
          <div className="flex flex-row flex-nowrap items-center justify-center gap-6">
            <button
              className="h-32 w-32 rounded-lg border-4 hover:scale-95"
              type="button"
              ref={redRef}
              onClick={() => {
                checkInput('red');
              }}
              style={{
                backgroundColor: '#FF5757',
                borderColor: '#CC4646',
              }}
            />
            <button
              className="h-32 w-32 rounded-lg border-4 hover:scale-95"
              type="button"
              ref={greenRef}
              onClick={() => {
                checkInput('green');
              }}
              style={{
                backgroundColor: '#7ED957',
                borderColor: '#65AE46',
              }}
            />
          </div>
          <div className="flex flex-row flex-nowrap items-center justify-center gap-6">
            <button
              className="h-32 w-32 rounded-lg border-4 hover:scale-95"
              type="button"
              ref={yellowRef}
              onClick={() => {
                checkInput('yellow');
              }}
              style={{
                backgroundColor: '#FFDE59',
                borderColor: '#CCB247',
              }}
            />
            <button
              className="h-32 w-32 rounded-lg border-4 hover:scale-95"
              type="button"
              ref={blueRef}
              onClick={() => {
                checkInput('blue');
              }}
              style={{
                backgroundColor: '#38B6FF',
                borderColor: '#2D92CC',
              }}
            />
          </div>
        </section>
      )}
      {!gameRunning && (
        <Closure
          onClick={() => {
            setSimonSequence([]);
            setPlayingIndex(0);
            setTimeout(() => {
              reset();
              setResult(false);
              setGameRunning(true);
            }, 1000);
          }}
          color={game.color}
          score={score}
        >
          <ResultContainer>
            <ResultText text={result ? 'you win!' : 'you lose!'} color={game.color} />
            <ScoreText score={counter} text="Level" />
          </ResultContainer>
        </Closure>
      )}
    </>
  );
}
