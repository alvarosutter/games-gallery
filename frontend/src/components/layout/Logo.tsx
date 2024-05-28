import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoStyle = styled(Link)`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.15rem;
  text-align: center;
  text-decoration: none;
  margin: 0;
  padding: 8px;
  width: fit-content;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const LogoHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

function Logo() {
  return (
    <LogoStyle to="/">
      <LogoHighlight>GAMES</LogoHighlight>
      GALLERY
    </LogoStyle>
  );
}

export default Logo;
