import styled from 'styled-components';

import type Score from '../../types/score';

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
  const entries = Object.entries(gameScore);

  return (
    <Container style={{ outlineColor: gameColor }}>
      {entries.map((entry) => {
        const label = entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
        const value = entry[1];
        return (
          <Box key={entry[0]}>
            <Label>{label}</Label>
            <Text>{value === -1 ? '-' : value}</Text>
          </Box>
        );
      })}
    </Container>
  );
}

export default GameScore;
