/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameCover from '../../../components/ui/GameCover';
import { Score } from '../../../components/ui/GameScore';
import useCounter from '../../../hooks/useCounter';
import { Card, generateSet } from './game.utils';

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-content: center;
  grid-gap: 25px;
  margin: auto;
  @media (min-width: 350px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000000;
  border: 4px solid #7a7a7a;
  border-radius: 10px;
  width: 60px;
  height: 80px;
  @media (min-width: 380px) {
    width: 65px;
    height: 85px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80px;
    height: 100px;
  }
`;
const CardText = styled.button`
  font-family: ${({ theme }) => theme.fonts.altFont};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  color: #282828;
  background-color: #e7e6e6;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
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
  const { counter: turns, increment: incrementTurns, reset: resetTurns } = useCounter(0);
  const [cards, setCards] = useState<Card[]>([]);
  const { counter: picks, increment: incrementPicks, reset: resetPicks } = useCounter(0);
  const { counter: pairs, increment: incrementPairs, reset: resetPairs } = useCounter(0);
  const [targets, setTargets] = useState<EventTarget[] & HTMLButtonElement[]>([]);

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
          if (turns < score.highestScore! || score.highestScore === undefined) {
            setScore({ highestScore: turns });
          }
          resetPairs();
          setGameRunning(false);
        }
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startGame();
  }, [gameRunning]);

  return (
    <>
      {gameRunning && (
        <GameContainer>
          {cards.map((card, index) => (
            <CardWrapper style={{ backgroundColor: game.color }}>
              <CardText
                key={card + index}
                onClick={(e) => {
                  handleClick(e);
                }}
                value={card}
              >
                {card}
              </CardText>
            </CardWrapper>
          ))}
        </GameContainer>
      )}
      {!gameRunning && (
        <GameCover
          onClick={() => {
            resetTurns();
            setGameRunning(true);
          }}
          game={game}
          buttonText="Play Again"
          score={score}
        >
          <ResultBox>
            <GameResult style={{ color: game.color }}>YOU WIN!</GameResult>
            <ResultText>Turns: {turns - 1}</ResultText>
          </ResultBox>
        </GameCover>
      )}
    </>
  );
}

export default Game;
