import styled from 'styled-components';
import GameLogo from '../styles/GameLogo.styled';
import GameScore, { Score } from './GameScore';
import PlayGameBtn from './PlayGameBtn';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 10px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: auto;
  width: 80%;
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  margin: 5px;
  padding: 10px;
`;

const BottomBox = styled(TopBox)`
  gap: 50px 150px;
  margin-top: 30px;
`;

interface CoverProps {
  game: { name: string; description?: string; logo?: string; color: string };
  score: Score;
  onClick: () => void;
  children?: React.ReactNode | React.ReactNode[];
  buttonText: string;
}
function Cover({ game, score, onClick, children, buttonText }: CoverProps) {
  return (
    <Container>
      {buttonText.toUpperCase() === 'PLAY GAME' && <GameLogo src={game.logo} alt={game.name} />}
      <TopBox>{children !== undefined ? children : <Description>{game.description}</Description>}</TopBox>
      <BottomBox>
        <GameScore gameColor={game.color} gameScore={score} />
        <PlayGameBtn title={buttonText} onClick={onClick} style={{ backgroundColor: game.color }}>
          {buttonText}
        </PlayGameBtn>
      </BottomBox>
    </Container>
  );
}

export default Cover;
