import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { dicePoker, hangman, higherLower, pigGame, rockPaperScissors, simonsgame, memory } from '../assets/icons';

const GamesContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  align-content: flex-start;
  gap: 35px 30px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const GameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 150px;
`;

const GameLogo = styled.img`
  width: 200px;
  height: 150px;
  cursor: pointer;
  @media (min-width: 350px) {
    width: 300px;
    height: 150px;
  }
`;

function Dashboard() {
  return (
    <GamesContainer>
      <GameBox>
        <Link to="/rockpaperscissors">
          <GameLogo src={rockPaperScissors} alt="Rock-Paper-Scissors" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/higherlower">
          <GameLogo src={higherLower} alt="Higher-Lower" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/pigGame">
          <GameLogo src={pigGame} alt="pigGame" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/dicePoker">
          <GameLogo src={dicePoker} alt="dicePoker" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/hangman">
          <GameLogo src={hangman} alt="hangman" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/simonsgame">
          <GameLogo src={simonsgame} alt="simonsgame" />
        </Link>
      </GameBox>
      <GameBox>
        <Link to="/memory">
          <GameLogo src={memory} alt="memory" />
        </Link>
      </GameBox>
    </GamesContainer>
  );
}

export default Dashboard;
