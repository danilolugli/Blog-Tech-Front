import styled from 'styled-components';
import './App.css';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar';
import Login from './pages/Login/Login';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;

function App() {
  
  return (
    <>
      <AppContainer>
        
        <SideBar/>

        <Login/>  {// # # /* Login só está de exemplo */
        }

      </AppContainer>
    
      <Footer/>
    </>
  );
}

export default App;
