import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
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
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
