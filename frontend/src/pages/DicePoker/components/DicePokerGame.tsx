import { useEffect, useState } from 'react';
import styled from 'styled-components';

import type { Dice } from './game.utils';
import { check, getDices } from './game.utils';
import PlayerResult from './PlayerResult';
import { EndGameCover } from '../../../components/ui/GameCover';
import PlayGameBtn from '../../../components/ui/PlayGameBtn';
import useCounter from '../../../hooks/useCounter';
import type Score from '../../../types/score';

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const GameResult = styled.p`
  font-family: ${({ theme }) => theme.fonts.headersFont};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  margin: 0;
`;

interface GameProps {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
}

function DicePokerGame({ game, score, setScore }: GameProps) {
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
      <PlayGameBtn
        title="Roll Dices"
        onClick={playGame}
        style={{ margin: 'auto', backgroundColor: game.color }}
      >
        Roll Dice
      </PlayGameBtn>
    );
  }

  return (
    <EndGameCover onClick={handleStartGame} gameColor={game.color} score={score}>
      <ResultBox>
        <GameResult style={{ color: game.color }}>{result.res.toLocaleUpperCase()}</GameResult>
        <PlayerResult
          name="You"
          result={result.player}
          dices={playerDices}
          gameColor={game.color}
        />
        <PlayerResult name="PC" result={result.pc} dices={pcDices} gameColor={game.color} />
      </ResultBox>
    </EndGameCover>
  );
}

export default DicePokerGame;
