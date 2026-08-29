import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  margin-left: 240px;
  height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const PageContent = styled.div`
  height: 100%;
`;

function MainLayout() {
  return (
    <AppContainer>
      <SideBar />

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