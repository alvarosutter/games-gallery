import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DicePoker from './pages/DicePoker/DicePoker';
import Hangman from './pages/Hangman/Hangman';
import HigherLower from './pages/HigherLower/HigherLower';
import PigGame from './pages/PigGame/PigGame';
import RockPaperScissors from './pages/RockPaperScissors/RockPaperScissors';
import darkTheme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <FontStyles />
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rockpaperscissors" element={<RockPaperScissors />} />
            <Route path="/piggame" element={<PigGame />} />
            <Route path="/higherLower" element={<HigherLower />} />
            <Route path="/dicepoker" element={<DicePoker />} />
            <Route path="/hangman" element={<Hangman />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
