import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function MainLayout() {
  return (
    <AppContainer>
      <SideBar />

      <Main>
        <Outlet />
        <Footer />
      </Main>
    </AppContainer>
  );
}

export default MainLayout;