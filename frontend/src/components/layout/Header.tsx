import styled from 'styled-components';

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.colors.headerBg};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: fit-content;
  margin: 0;
  padding: 2px 15px;
  user-select: none;
  @media (max-width: 350px) {
    flex-direction: column;
    gap: 5px;
    padding: 2px 0px 10px;
  }
`;

interface HeaderProps {
  children: React.ReactNode | React.ReactNode[];
}

function Header({ children }: HeaderProps) {
  return <HeaderStyle>{children}</HeaderStyle>;
}

export default Header;
