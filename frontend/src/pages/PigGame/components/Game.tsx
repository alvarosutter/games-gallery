import { useState } from 'react';
import styled from 'styled-components';

import { EndGameCover } from '../../../components/ui/GameCover';
import PlayGameBtn from '../../../components/ui/PlayGameBtn';
import useCounter from '../../../hooks/useCounter';
import type Score from '../../../types/score';
import { dice_1, dice_2, dice_3, dice_4, dice_5, dice_6 } from '../assets';

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
`;

const Dice = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

const ScoreText = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont};
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  margin: 0;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ResultText = styled(ScoreText)`
  font-size: 3rem;
`;

interface GameProps {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
}

function Game({ game, score, setScore }: GameProps) {
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

  function getImgSource(number: number) {
    if (number === 2) return dice_2;
    if (number === 3) return dice_3;
    if (number === 4) return dice_4;
    if (number === 5) return dice_5;
    if (number === 6) return dice_6;
    return dice_1;
  }

  return (
    <>
      {gameRunning && (
        <GameContainer>
          <Dice
            style={!dice ? { opacity: '0' } : {}}
            src={getImgSource(dice)}
            alt={dice.toString()}
          />
          <ScoreText>{`Score: ${counter}`}</ScoreText>
          <PlayGameBtn
            title="Roll Dice"
            onClick={() => {
              roll();
            }}
            style={{ backgroundColor: game.color }}
          >
            Roll Dice
          </PlayGameBtn>
        </GameContainer>
      )}
      {!gameRunning && (
        <EndGameCover
          onClick={() => {
            reset();
            setDice(0);
            setGameRunning(true);
          }}
          gameColor={game.color}
          score={score}
        >
          <ResultBox>
            <Dice src={getImgSource(dice)} alt={dice.toString()} />
            <ResultText style={{ color: game.color }}>GAME OVER!</ResultText>
            <ScoreText>{`Score: ${counter}`}</ScoreText>
          </ResultBox>
        </EndGameCover>
      )}
    </>
  );
}

export default Game;
