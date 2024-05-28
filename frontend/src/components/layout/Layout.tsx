import type { ReactNode } from 'react';
import styled from 'styled-components';

import Footer, { footerHeight } from './Footer';
import Header, { headerHeight } from './Header';
import Logo from './Logo';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  max-width: 95%;
  margin: auto;
  padding: 10px 10px;
`;
interface LayoutProps {
  children: ReactNode | Array<ReactNode>;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
