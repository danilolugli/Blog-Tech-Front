import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  margin-left: 240px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const SideBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    width: 240px;
    height: 100vh;

    box-sizing: border-box;
    padding: 20px;

    font-family: Merriweather;
    background-color: var(--azul-mais-escuro);

    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;
`;

const PageContent = styled.div`
  min-height: 100vh;
`;

function MainLayout() {
  return (
    <AppContainer>
      <SideBarContainer>
        <SideBar />
      </SideBarContainer>

      <Main>

        <PageContent>
          <Outlet />
        </PageContent>

        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Main>
    </AppContainer>
  );
}

export default MainLayout;