import styled from 'styled-components';

const LogoStyle = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.15rem;
  text-align: center;
  margin: 0;
  padding: 10px;
  width: fit-content;
`;

const LogoHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

function Logo() {
  return (
    <LogoStyle>
      <LogoHighlight>GAMES</LogoHighlight>GALLERY
    </LogoStyle>
  );
}

export default Logo;
