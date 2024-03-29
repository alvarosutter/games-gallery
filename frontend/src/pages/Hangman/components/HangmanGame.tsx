import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EndGameCover } from '../../../components/ui/GameCover';
import PlayGameBtn from '../../../components/ui/PlayGameBtn';
import useCounter from '../../../hooks/useCounter';
import generateWord from './game.util';
import HangmanBody from './HangmanBody';
import Score from '../../../types/score';
import Word from './Word';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 35px 15px;
  width: 100%;
  margin: auto;
`;

const HangmanStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 35px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 25px 25px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

const Input = styled.input`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  background-color: #ffffffec;
  border: 3px solid #c0c0c0;
  border-radius: 10px;
  color: #000000;
  padding: 10px;
  width: 55px;
  height: 55px;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 15px 35px;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  text-align: center;
  margin: 0;

  span {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: ${({ theme }) => theme.colors.altText};
  }
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ResultText = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
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

function HangmanGame({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState('');
  const { counter: lives, decrement: decrementLives, reset: resetLives, add: addLives } = useCounter(6);
  const { counter: turns, increment: incrementTurns, reset: resetTurns } = useCounter(0);
  const { counter: win, increment: incrementWin } = useCounter(score.win);
  const { counter: lost, increment: incrementLost } = useCounter(score.lost);
  const [word, setWord] = useState(generateWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const guessRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guess = guessRef.current?.value;

    guesses.push(guess!.toUpperCase());
    incrementTurns();

    if (!word.includes(guess!.toUpperCase())) {
      decrementLives();
      if (lives === 1) {
        setGameRunning(false);
        setResult('You lose!');
        incrementLost();
      }
    }

    /** Returns true if all the letters of the word are present in the guesses */
    const check = word
      .split('')
      .filter((letter) => letter !== ' ')
      .every((letter) => guesses.includes(letter));
    if (check) {
      setResult('You win!');
      incrementWin();
      setGameRunning(false);
    }

    event.currentTarget.reset();
  };

  const handlePlayAgain = () => {
    setGuesses([]);
    setWord(generateWord());
    resetLives();
    resetTurns();
    addLives(6);
    setGameRunning(true);
  };

  useEffect(() => {
    setScore({ win, lost });
  }, [win, lost]);

  return (
    <GameContainer>
      {(gameRunning || result === 'You lose!') && (
        <HangmanStyle>
          <HangmanBody lives={lives} />
        </HangmanStyle>
      )}
      <Word word={word} guesses={guesses} gameRunning={gameRunning} />
      {gameRunning && (
        <>
          <FormWrapper>
            <InputForm onSubmit={submitHandler}>
              <Label>
                Guess: <Input ref={guessRef} type="text" maxLength={1} autoFocus required />
              </Label>
              <PlayGameBtn style={{ margin: '20px', backgroundColor: `${game.color}` }} type="submit">
                Enter
              </PlayGameBtn>
            </InputForm>
          </FormWrapper>
          <GameInfo>
            <InfoText style={{ display: 'none' }}>Turns: {turns}</InfoText>
            <InfoText>
              {guesses.map((g, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={g + i}>{g} </span>
              ))}
            </InfoText>
          </GameInfo>
        </>
      )}
      {!gameRunning && (
        <EndGameCover onClick={handlePlayAgain} gameColor={game.color} score={score}>
          <ResultBox>
            <ResultText style={{ color: game.color }}>{result.toLocaleUpperCase()}</ResultText>
          </ResultBox>
        </EndGameCover>
      )}
    </GameContainer>
  );
}

export default HangmanGame;
