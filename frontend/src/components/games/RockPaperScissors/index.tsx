import { useEffect, useState } from 'react';

import OptionBtn from './OptionBtn';
import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import ResultText from '../../ui/Game/ResultText';

const options = ['✊', '✋', '✌'];

function getPickStyle(pick: string) {
  if (pick === '✊') return '#FF914D';
  if (pick === '✋') return '#C9E265';
  if (pick === '✌') return '#CB6CE6';
  return '#38b6ff';
}

function generatePick() {
  const randomNumber = Math.floor(Math.random() * options.length);
  return options[randomNumber];
}

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function RockPaperScissors({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState('');
  const [picks, setPicks] = useState({ player: '', pc: '' });
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: draw, increment: incrementDraw } = useCounter(score.draw);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);

  function check(playerPick: string) {
    const pcPick = generatePick();
    setPicks({ player: playerPick, pc: pcPick });

    if (playerPick === pcPick) {
      incrementDraw();
      setResult('Draw!');
      setGameRunning(false);
      return;
    }
    if (playerPick === '✊') {
      if (pcPick === '✋') {
        incrementLost();
        setResult('You lose!');
        setGameRunning(false);
        return;
      }
    }
    if (playerPick === '✋') {
      if (pcPick === '✌') {
        incrementLost();
        setResult('You lose!');
        setGameRunning(false);
        return;
      }
    }
    if (playerPick === '✌') {
      if (pcPick === '✊') {
        incrementLost();
        setResult('You lose!');
        setGameRunning(false);
        return;
      }
    }

    incrementWin();
    setResult('You Win!');
    setGameRunning(false);
  }

  useEffect(() => {
    setScore({ win, draw, lost });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win, draw, lost]);

  return (
    <>
      {gameRunning && (
        <section className="flex flex-col flex-wrap items-center justify-evenly gap-16 md:flex-row">
          <OptionBtn
            title="rock"
            pick="✊"
            onClick={() => {
              check('✊');
            }}
            borderColor={getPickStyle('✊')}
          />
          <OptionBtn
            title="paper"
            pick="✋"
            onClick={() => {
              check('✋');
            }}
            borderColor={getPickStyle('✋')}
          />
          <OptionBtn
            title="scissors"
            pick="✌"
            onClick={() => {
              check('✌');
            }}
            borderColor={getPickStyle('✌')}
          />
        </section>
      )}
      {!gameRunning && (
        <Closure onClick={() => setGameRunning(true)} color={game.color} score={score}>
          <div className="mb-12 flex flex-col items-center justify-center gap-8">
            <ResultText text={result} color={game.color} />
            <div className="mt-4 flex flex-col flex-wrap content-center items-center justify-center gap-4 sm:my-12 sm:flex-row sm:gap-8">
              <OptionBtn
                title={picks.player}
                pick={picks.player}
                borderColor={getPickStyle(picks.player)}
                disable
              />
              <p className="text-center text-5xl">VS</p>
              <OptionBtn
                title={picks.pc}
                pick={picks.pc}
                borderColor={getPickStyle(picks.pc)}
                disable
              />
            </div>
          </div>
        </Closure>
      )}
    </>
  );
}
