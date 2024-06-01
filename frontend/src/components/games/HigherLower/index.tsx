import { useState, useEffect } from 'react';

import DeckCard from './DeckCard';
import type { Card } from './higherLower.utils';
import { spades, hearts, diamonds, clubs } from './higherLower.utils';
import useCounter from '../../../hooks/useCounter';
import type { Score } from '../../../types/score';
import Closure from '../../ui/Game/Closure';
import PlayButton from '../../ui/Game/PlayButton';
import ResultContainer from '../../ui/Game/ResultContainer';
import ResultText from '../../ui/Game/ResultText';
import ScoreText from '../../ui/Game/ScoreText';

type GameProps = {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
};

export default function HigherLower({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const { counter, increment, reset } = useCounter();
  const [result, setResult] = useState(false);
  const cards = [...spades, ...hearts, ...diamonds, ...clubs];
  const [deck, setCards] = useState<Array<Card>>([...cards]);
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
      // eslint-disable-next-line operator-linebreak
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

  const handlePlayAgain = () => {
    reset();
    resetDeck();
    setGameRunning(true);
    setResult(false);
  };

  useEffect(() => {
    // removes the card from the deck
    const index = deck.findIndex((e) => e.unicode === card.unicode);
    deck.splice(index, 1);

    if (counter > score.highestScore!) {
      setScore({ highestScore: counter });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <>
      {gameRunning && (
        <section className="flex flex-col items-center justify-center">
          <DeckCard card={card} />
          <div className="my-8 flex flex-row flex-wrap content-center items-center justify-center gap-6 sm:my-16 sm:gap-8">
            <PlayButton text="Higher" onClick={() => check('higher')} color="#7ed957bb" />
            <PlayButton text="Lower" onClick={() => check('lower')} color="#ec4759bb" />
          </div>
        </section>
      )}
      {!gameRunning && (
        <Closure onClick={handlePlayAgain} color={game.color} score={score}>
          <ResultContainer>
            <ResultText text={result ? 'you win!' : 'game over!'} color={game.color} />
            <ScoreText score={counter} />
            {!result && <DeckCard card={card} />}
          </ResultContainer>
        </Closure>
      )}
    </>
  );
}
