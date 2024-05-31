import { useState, useEffect } from 'react';

import type { Dice } from './dicePoker.utils';
import { check, getDices } from './dicePoker.utils';
import RollResult from './RollResult';
import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import PlayButton from '../../ui/Game/PlayButton';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function DicePokerGame({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState({ res: '', player: '', pc: '' });
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: draw, increment: incrementDraw } = useCounter(score.draw);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);
  const [playerDices, setPlayerDices] = useState<Array<Dice>>([]);
  const [pcDices, setPcDices] = useState<Array<Dice>>([]);

  function checkResult(playerRoll: Array<Dice>, pcRoll: Array<Dice>) {
    const { result: res, player, pc } = check(playerRoll, pcRoll);
    if (res === 'draw') {
      incrementDraw();
      setResult({ res: 'Draw!', player, pc });
    }
    if (res === 'player') {
      incrementWin();
      setResult({ res: 'You win!', player, pc });
    }
    if (res === 'pc') {
      incrementLost();
      setResult({ res: 'You lose!', player, pc });
    }

    setGameRunning(false);
  }

  const playGame = async () => {
    const player = await getDices();
    setPlayerDices(player);
    const pc = await getDices();
    setPcDices(pc);
    checkResult(player, pc);
  };

  const handleStartGame = async () => {
    setGameRunning(true);
    setPlayerDices([]);
    setPcDices([]);
    await playGame();
  };

  useEffect(() => {
    setScore({ win, draw, lost });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win, draw, lost]);

  if (gameRunning) {
    return (
      <div className="flex items-center justify-center">
        <PlayButton text="Roll Dices" onClick={playGame} color={game.color} />
      </div>
    );
  }

  return (
    <Closure onClick={handleStartGame} color={game.color} score={score}>
      <ResultContainer>
        <ResultText text={result.res} color={game.color} />
        <RollResult name="You" result={result.player} dices={playerDices} color={game.color} />
        <RollResult name="PC" result={result.pc} dices={pcDices} color={game.color} />
      </ResultContainer>
    </Closure>
  );
}
