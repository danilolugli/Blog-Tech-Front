import styled from 'styled-components';
import './App.css';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar';
import Login from './pages/Login/Login';
import { useState } from 'react';

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

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <AppContainer>
        
        {isLoggedIn && (
        <SideBar/>)}

        <Main>
          <Login/>  {// # # /* Login só está de exemplo */
          }
          <Footer/>
        </Main>
       
          

      </AppContainer>
    
    </>
  );
}

export default App;
