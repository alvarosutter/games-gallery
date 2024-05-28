import styled from 'styled-components';

import GameScore from './GameScore';
import PlayGameBtn from './PlayGameBtn';
import type Game from '../../types/game';
import type Score from '../../types/score';
import GameLogo from '../styles/GameLogo.styled';

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

interface IStarGameCoverProps {
  game: Game;
  score: Score;
  onClick: () => void;
}

function StartGameCover({ game, score, onClick }: IStarGameCoverProps) {
  return (
    <Container>
      <GameLogo src={game.logo} alt={game.name} />
      <TopBox>
        <Description>{game.description}</Description>
      </TopBox>
      <BottomBox>
        <GameScore gameColor={game.color} gameScore={score} />
        <PlayGameBtn title="PLAY GAME" onClick={onClick} style={{ backgroundColor: game.color }}>
          PLAY GAME
        </PlayGameBtn>
      </BottomBox>
    </Container>
  );
}

interface IEndGameCoverProps {
  children: React.ReactNode | Array<React.ReactNode>;
  score: Score;
  onClick: () => void;
  gameColor: string;
}

function EndGameCover({ gameColor, score, onClick, children }: IEndGameCoverProps) {
  return (
    <Container>
      <TopBox>{children}</TopBox>
      <BottomBox>
        <GameScore gameColor={gameColor} gameScore={score} />
        <PlayGameBtn title="PLAY AGAIN" onClick={onClick} style={{ backgroundColor: gameColor }}>
          PLAY AGAIN
        </PlayGameBtn>
      </BottomBox>
    </Container>
  );
}

export { StartGameCover, EndGameCover };
