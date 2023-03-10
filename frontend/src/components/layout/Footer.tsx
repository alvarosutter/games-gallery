import styled from 'styled-components';

export const footerHeight = '40px';

const FooterStyle = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: ${footerHeight};
  user-select: none;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.altText};
  font-family: ${({ theme }) => theme.fonts.altFont}, sans-serif;
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  letter-spacing: 0.05rem;
  text-align: center;
  margin: 0;
  padding: 10px;
`;

const OutsideLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
    cursor: pointer;
  }
`;

function Footer() {
  return (
    <FooterStyle>
      <Text>
        © 2023 | Build and design by{' '}
        <span>
          <OutsideLink href="https://asutter.com" target="_blank">
            Alvaro Sutter
          </OutsideLink>
        </span>
      </Text>
    </FooterStyle>
  );
}

export default Footer;
