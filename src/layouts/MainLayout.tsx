import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

function MainLayout() {
  return (
    <AppContainer>
      <SideBar />

      <Main>
        <Outlet />

        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Main>
    </AppContainer>
  );
}

export default MainLayout;