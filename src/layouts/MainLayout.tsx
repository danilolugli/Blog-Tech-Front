import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import SideBar from "../components/Sidebar/SideBar";

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  margin-left: 236px;
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