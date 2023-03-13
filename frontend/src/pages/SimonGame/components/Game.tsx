import { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GameCover from '../../../components/ui/GameCover';
import { Score } from '../../../components/ui/GameScore';
import useCounter from '../../../hooks/useCounter';
import { redSound, greenSound, yellowSound, blueSound, wrongSound } from '../assets';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const GameButton = styled.button`
  border: 4px solid;
  border-radius: 10px;
  width: 120px;
  height: 120px;
  &:hover {
    transform: scale(0.97);
    cursor: pointer;
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

const Level = styled(ResultText)`
  margin-bottom: 25px;
  font-size: 2.3rem;
`;

type Color = 'red' | 'green' | 'yellow' | 'blue';

interface GameProps {
  game: { name: string; color: string };
  score: Score;
  setScore: (score: Score) => void;
}

function Game({ game, score, setScore }: GameProps) {
  const [gameRunning, setGameRunning] = useState(true);
  const [result, setResult] = useState(false);
  const { counter, increment, reset } = useCounter();
  const colors: Color[] = ['red', 'green', 'yellow', 'blue'];
  const [simonSequence, setSimonSequence] = useState<Color[]>([]);
  const [playingIndex, setPlayingIndex] = useState(0);

  const redRef = useRef<HTMLButtonElement>(null);
  const greenRef = useRef<HTMLButtonElement>(null);
  const yellowRef = useRef<HTMLButtonElement>(null);
  const blueRef = useRef<HTMLButtonElement>(null);

  const wrongAudio = new Audio(wrongSound);

  function addNextColor() {
    const next = colors[Math.floor(Math.random() * colors.length)];
    const sequence = [...simonSequence, next];
    setSimonSequence(sequence);
  }

  function highlightButton(index = 0) {
    const animationDelay = 400;
    const animationDuration = 250;
    let ref: RefObject<HTMLButtonElement> | null = null;
    if (simonSequence[index] === 'red') ref = redRef;
    if (simonSequence[index] === 'green') ref = greenRef;
    if (simonSequence[index] === 'yellow') ref = yellowRef;
    if (simonSequence[index] === 'blue') ref = blueRef;

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref!.current!.style.filter = 'brightness(2)';
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ref!.current!.style.filter = 'brightness(1)';
        if (index < simonSequence.length - 1) highlightButton(index + 1);
      }, animationDuration);
    }, animationDelay);
  }

  function checkInput(clickColor: Color, sound: string) {
    const audio = new Audio(sound);
    if (gameRunning)
      setTimeout(() => {
        if (simonSequence[playingIndex] === clickColor) {
          audio.play();
          if (playingIndex === simonSequence.length - 1) {
            setTimeout(() => {
              setPlayingIndex(0);
              if (counter === 14) {
                setResult(true);
                setGameRunning(false);
              }
              increment();
              addNextColor();
            }, 250);
          } else {
            setPlayingIndex(playingIndex + 1);
          }
        } else {
          wrongAudio.play();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (simonSequence.length > score.highestLevel!) {
            setScore({ highestLevel: counter });
          }
          setGameRunning(false);
        }
      }, 250);
  }

  useEffect(() => {
    addNextColor();
  }, [gameRunning]);

  useEffect(() => {
    if (simonSequence.length > 0) highlightButton();
  }, [simonSequence]);

  return (
    <>
      {gameRunning && (
        <GameContainer>
          <Level>LEVEL {counter}</Level>
          <Row>
            <GameButton
              ref={redRef}
              onClick={() => {
                checkInput('red', redSound);
              }}
              style={{
                backgroundColor: '#FF5757',
                borderColor: '#CC4646',
              }}
            />
            <GameButton
              ref={greenRef}
              onClick={() => {
                checkInput('green', greenSound);
              }}
              style={{
                backgroundColor: '#7ED957',
                borderColor: '#65AE46',
              }}
            />
          </Row>
          <Row>
            <GameButton
              ref={yellowRef}
              onClick={() => {
                checkInput('yellow', yellowSound);
              }}
              style={{
                backgroundColor: '#FFDE59',
                borderColor: '#CCB247',
              }}
            />
            <GameButton
              ref={blueRef}
              onClick={() => {
                checkInput('blue', blueSound);
              }}
              style={{
                backgroundColor: '#38B6FF',
                borderColor: '#2D92CC',
              }}
            />
          </Row>
        </GameContainer>
      )}
      {!gameRunning && (
        <GameCover
          onClick={() => {
            setSimonSequence([]);
            setPlayingIndex(0);
            setTimeout(() => {
              reset();
              setResult(false);
              setGameRunning(true);
            }, 1000);
          }}
          game={game}
          buttonText="Play Again"
          score={score}
        >
          <ResultBox>
            <GameResult style={{ color: game.color }}>{result ? 'YOU WIN!' : 'YOU LOSE!'}</GameResult>
            <Level>LEVEL {counter}</Level>
          </ResultBox>
        </GameCover>
      )}
    </>
  );
}

export default Game;
