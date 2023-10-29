/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameCover from '../../../components/ui/GameCover';
import { Score } from '../../../components/ui/GameScore';
import PlayGameBtn from '../../../components/ui/PlayGameBtn';
import useCounter from '../../../hooks/useCounter';
import { check, Dice, getDices } from './game.utils';

const DicesBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 15px 15px;
  @media (min-width: 330px) {
    width: 120%;
  }
`;
const DiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffffee;
  color: #000000;
  border: 4px solid;
  border-radius: 10px;
  width: 50px;
  height: 50px;
`;
const DiceText = styled.p`
  font-family: ${({ theme }) => theme.fonts.altFont};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: #282828;
  margin: 0;
  padding: 0;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ResultText = styled.p`
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 0;
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

function Game({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState({ res: '', player: '', pc: '' });
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: draw, increment: incrementDraw } = useCounter(score.draw);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);
  const [playerDices, setPlayerDices] = useState<Dice[]>([]);
  const [pcDices, setPcDices] = useState<Dice[]>([]);

  function checkResult(playerRoll: Dice[], pcRoll: Dice[]) {
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

  async function playGame() {
    const player = await getDices();
    setPlayerDices(player);
    const pc = await getDices();
    setPcDices(pc);
    checkResult(player, pc);
  }

  useEffect(() => {
    setScore({ win, draw, lost });
  }, [win, draw, lost]);

  return (
    <>
      {gameRunning && (
        <PlayGameBtn
          title="Roll Dices"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            playGame();
          }}
          style={{ margin: 'auto', backgroundColor: game.color }}
        >
          Roll Dice
        </PlayGameBtn>
      )}
      {!gameRunning && (
        <GameCover
          onClick={() => {
            setGameRunning(true);
            setPlayerDices([]);
            setPcDices([]);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            playGame();
          }}
          game={game}
          buttonText="Roll Again"
          score={score}
        >
          <ResultBox>
            <GameResult style={{ color: game.color }}>{result.res.toLocaleUpperCase()}</GameResult>
            {playerDices && (
              <>
                <ResultText> You: {result.player}</ResultText>
                <DicesBox>
                  {playerDices.map((dice, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <DiceWrapper key={dice.letter + i} style={{ borderColor: game.color }}>
                      <DiceText>{dice.letter}</DiceText>
                    </DiceWrapper>
                  ))}
                </DicesBox>
              </>
            )}
            {pcDices && (
              <>
                <ResultText> PC: {result.pc}</ResultText>
                <DicesBox>
                  {pcDices.map((dice, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <DiceWrapper key={dice.letter + i} style={{ borderColor: game.color }}>
                      <DiceText>{dice.letter}</DiceText>
                    </DiceWrapper>
                  ))}
                </DicesBox>
              </>
            )}
          </ResultBox>
        </GameCover>
      )}
    </>
  );
}

export default Game;
