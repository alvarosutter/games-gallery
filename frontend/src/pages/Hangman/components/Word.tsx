import { styled } from 'styled-components';

const WordStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 15px 10px;
  width: 100%;
`;

const Letter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.altText};

  p {
    color: #282828;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 0;
  }
`;

interface IWordProps {
  word: string;
  guesses: Array<string>;
  gameRunning: boolean;
}

function Word({ word, guesses, gameRunning }: IWordProps) {
  return (
    <WordStyle>
      {word.split('').map((letter, i) => {
        const notEmpty = (
          // eslint-disable-next-line react/no-array-index-key
          <Letter key={letter + i}>
            <p
              style={
                guesses.includes(letter) || !gameRunning
                  ? { color: '#ffffff' }
                  : { visibility: 'hidden' }
              }
            >
              {letter}
            </p>
          </Letter>
        );
        // eslint-disable-next-line react/no-array-index-key
        const empty = <Letter style={{ visibility: 'hidden' }} key={letter + i} />;
        return letter !== ' ' ? notEmpty : empty;
      })}
    </WordStyle>
  );
}

export default Word;
