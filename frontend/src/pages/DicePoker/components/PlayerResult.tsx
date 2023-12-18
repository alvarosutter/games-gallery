import { styled } from 'styled-components';
import { Dice } from './game.utils';

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

const ResultText = styled.p`
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 0;
`;

interface IPlayerResult {
  name: string;
  result: string;
  dices: Dice[];
  gameColor: string;
}

function PlayerResult({ name, result, dices, gameColor }: IPlayerResult) {
  return (
    <>
      <ResultText>
        {name}: {result}
      </ResultText>
      <DicesBox>
        {dices.map((dice) => (
          <DiceWrapper key={dice.id} style={{ borderColor: gameColor }}>
            <DiceText>{dice.letter}</DiceText>
          </DiceWrapper>
        ))}
      </DicesBox>
    </>
  );
}

export default PlayerResult;
