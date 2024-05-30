import { useEffect, useState } from 'react';

import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';

function getPickStyle(pick: string) {
  if (pick === '✊') return '#FF914D';
  if (pick === '✋') return '#C9E265';
  if (pick === '✌') return '#CB6CE6';
  return '#38b6ff';
}

interface GameProps {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
}

export default function RockPaperScissors({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState('');
  const [picks, setPicks] = useState({ player: '', pc: '' });
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: draw, increment: incrementDraw } = useCounter(score.draw);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);

  const options = ['✊', '✋', '✌'];

  function check(playerPick: string) {
    const randomNumber = Math.floor(Math.random() * options.length);
    const pcPick = options[randomNumber];
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
        <div>
          <button
            type="button"
            title="rock"
            onClick={() => {
              check('✊');
            }}
            style={{ borderColor: `${getPickStyle('✊')}` }}
          >
            ✊
          </button>
          <button
            type="button"
            title="paper"
            onClick={() => {
              check('✋');
            }}
            style={{ borderColor: `${getPickStyle('✋')}` }}
          >
            ✋
          </button>
          <button
            type="button"
            title="scissors"
            onClick={() => {
              check('✌');
            }}
            style={{ borderColor: `${getPickStyle('✌')}` }}
          >
            ✌
          </button>
        </div>
      )}
      {!gameRunning && (
        <Closure onClick={() => setGameRunning(true)} color={game.color} score={score}>
          <div>
            <p style={{ color: game.color }}>{result.toLocaleUpperCase()}</p>
            <div>
              <div title={picks.player} style={{ borderColor: `${getPickStyle(picks.player)}` }}>
                {picks.player}
              </div>
              <p>VS</p>
              <div title={picks.player} style={{ borderColor: `${getPickStyle(picks.pc)}` }}>
                {picks.pc}
              </div>
            </div>
          </div>
        </Closure>
      )}
    </>
  );
}
