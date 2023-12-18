import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useCounter from '../../../hooks/useCounter';
import Score from '../../../types/score';
import { EndGameCover } from '../../../components/ui/GameCover';

function getPickStyle(pick: string) {
  if (pick === '✊') return '#FF914D';
  if (pick === '✋') return '#C9E265';
  if (pick === '✌') return '#CB6CE6';
  return '#38b6ff';
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  gap: 50px 15px;
  width: 100%;
  margin: auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const PickStyled = css`
  background-color: ${({ theme }) => theme.colors.scoreBg};
  border: 7px solid ${({ theme }) => theme.colors.primary};
  font-size: 5rem;
  text-align: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const OptionBtn = styled.button`
  ${PickStyled}
  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    filter: brightness(1.1);
  }
`;

const ResultText = styled.p`
  font-family: ${({ theme }) => theme.fonts.headersFont};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  margin: 0;
`;

const PicksBox = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
  gap: 10px;
  margin-bottom: 25px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    gap: 35px;
  }
`;

const PickResult = styled.div`
  ${PickStyled}
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: 4px solid ${({ theme }) => theme.colors.primary};
    font-size: 3rem;
    text-align: center;
    width: 90px;
    height: 90px;
  }
`;

interface GameProps {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
}

function Game({ game, score, setScore }: GameProps) {
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
  }, [win, draw, lost]);

  return (
    <>
      {gameRunning && (
        <GameContainer>
          <OptionBtn
            title="rock"
            onClick={() => {
              check('✊');
            }}
            style={{ borderColor: `${getPickStyle('✊')}` }}
          >
            ✊
          </OptionBtn>
          <OptionBtn
            title="paper"
            onClick={() => {
              check('✋');
            }}
            style={{ borderColor: `${getPickStyle('✋')}` }}
          >
            ✋
          </OptionBtn>
          <OptionBtn
            title="scissors"
            onClick={() => {
              check('✌');
            }}
            style={{ borderColor: `${getPickStyle('✌')}` }}
          >
            ✌
          </OptionBtn>
        </GameContainer>
      )}
      {!gameRunning && (
        <EndGameCover onClick={() => setGameRunning(true)} gameColor={game.color} score={score}>
          <ResultBox>
            <ResultText style={{ color: game.color }}>{result.toLocaleUpperCase()}</ResultText>
            <PicksBox>
              <PickResult title={picks.player} style={{ borderColor: `${getPickStyle(picks.player)}` }}>
                {picks.player}
              </PickResult>
              <ResultText>VS</ResultText>
              <PickResult title={picks.player} style={{ borderColor: `${getPickStyle(picks.pc)}` }}>
                {picks.pc}
              </PickResult>
            </PicksBox>
          </ResultBox>
        </EndGameCover>
      )}
    </>
  );
}

export default Game;
