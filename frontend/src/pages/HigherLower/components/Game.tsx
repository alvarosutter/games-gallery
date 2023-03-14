import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, clubs, diamonds, hearts, spades } from './game.utils';
import useCounter from '../../../hooks/useCounter';
import { Score } from '../../../components/ui/GameScore';
import PlayGameBtn from '../../../components/ui/PlayGameBtn';
import GameCover from '../../../components/ui/GameCover';

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

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffffee;
  color: #000000;
  outline: 3px solid #363636;
  border: 3px solid #ffffffbb;
  border-radius: 10px;
  min-height: 200px;
  max-height: 200px;
  min-width: 150px;
  max-width: 150px;
  padding: 10px 15px;
`;

const CardStyle = styled.p`
  font-size: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
  padding: 0;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 30px 30px;
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
  const { counter, increment, reset } = useCounter();
  const [result, setResult] = useState(false);
  const cards = [...spades, ...hearts, ...diamonds, ...clubs];
  const [deck, setCards] = useState<Card[]>([...cards]);
  const [card, setCard] = useState<Card>(deck[Math.floor(Math.random() * deck.length)]);

  function getRandomCard(): Card {
    return deck[Math.floor(Math.random() * deck.length)];
  }

  function resetDeck() {
    setCards([...spades, ...hearts, ...diamonds, ...clubs]);
    setCard(getRandomCard());
  }

  function check(playerPick: string) {
    const nextCard: Card = getRandomCard();

    if (
      (playerPick === 'higher' && card.value <= nextCard.value) ||
      (playerPick === 'lower' && card.value >= nextCard.value)
    ) {
      increment();
      if (deck.length === 1) {
        setResult(true);
        setScore({ highestScore: counter + 1 });
        setGameRunning(false);
        return;
      }
      setCard(nextCard);
      return;
    }

    setCard(nextCard);
    setGameRunning(false);
  }

  useEffect(() => {
    // removes the card from the deck
    const index = deck.findIndex((e) => e.unicode === card.unicode);
    deck.splice(index, 1);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (counter > score.highestScore!) {
      setScore({ highestScore: counter });
    }
  }, [card]);

  return (
    <>
      {gameRunning && (
        <GameContainer>
          <CardBox>
            <CardStyle style={card?.type === 'hearts' || card?.type === 'diamonds' ? { color: '#ff0000ee' } : {}}>
              {card?.unicode}
            </CardStyle>
          </CardBox>
          <ButtonsBox>
            <PlayGameBtn title="Go Higher" onClick={() => check('higher')} style={{ backgroundColor: '#7ed957bb' }}>
              Higher
            </PlayGameBtn>
            <PlayGameBtn title="Go Lower" onClick={() => check('lower')} style={{ backgroundColor: '#ec4759bb' }}>
              Lower
            </PlayGameBtn>
          </ButtonsBox>
        </GameContainer>
      )}
      {!gameRunning && (
        <GameCover
          onClick={() => {
            reset();
            resetDeck();
            setGameRunning(true);
            setResult(false);
          }}
          game={game}
          buttonText="Play Again"
          score={score}
        >
          <ResultBox>
            {!result && (
              <CardBox>
                <CardStyle style={card?.type === 'hearts' || card?.type === 'diamonds' ? { color: '#ff0000ee' } : {}}>
                  {card?.unicode}
                </CardStyle>
              </CardBox>
            )}
            <ResultText style={{ color: game.color }}>{result ? 'YOU WIN!' : 'GAME OVER!'}</ResultText>
            <ScoreText>Score: {counter}</ScoreText>
          </ResultBox>
        </GameCover>
      )}
    </>
  );
}

export default Game;
