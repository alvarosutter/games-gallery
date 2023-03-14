import styled from 'styled-components';

export type Score = {
  win?: number;
  draw?: number;
  lost?: number;
  highestScore?: number;
  highestLevel?: number;
};

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: fit-content;
  color: #121212;
  background-color: ${({ theme }) => theme.colors.scoreBg};
  outline: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin: 0;
  padding: 15px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
`;

const Text = styled.p`
  color: #121212;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.altFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 0;
`;

const Label = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

interface ScoreProps {
  gameColor: string;
  gameScore: Score;
}

function GameScore({ gameColor, gameScore }: ScoreProps) {
  return (
    <Container style={{ outlineColor: gameColor }}>
      {gameScore.win !== undefined && (
        <Box>
          <Label>Win</Label>
          <Text>{gameScore.win}</Text>
        </Box>
      )}
      {gameScore.draw !== undefined && (
        <Box>
          <Label>Draw</Label>
          <Text>{gameScore.draw}</Text>
        </Box>
      )}
      {gameScore.lost !== undefined && (
        <Box>
          <Label>Lost</Label>
          <Text>{gameScore.lost}</Text>
        </Box>
      )}
      {gameScore.highestScore !== undefined && (
        <Box>
          <Label>Highest Score</Label>
          <Text>{gameScore.highestScore}</Text>
        </Box>
      )}
      {gameScore.highestLevel !== undefined && (
        <Box>
          <Label>Highest Level</Label>
          <Text>{gameScore.highestLevel}</Text>
        </Box>
      )}
      {gameScore.highestScore === undefined && (
        <Box>
          <Label>Highest Score</Label>
          <Text> - </Text>
        </Box>
      )}
    </Container>
  );
}

export default GameScore;
