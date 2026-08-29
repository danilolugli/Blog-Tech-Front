import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSideBar from '../ButtonSideBar/ButtonSideBar';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faGear, faHouse, faUsers, faBars, faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SideBarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-family: Merriweather;
  background-color: var(--azul-mais-escuro);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    padding-top: 80px; /* 60px da MobileHeader + respiro */
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    align-items: center;
    gap: 12px;
    padding: 0 15px;
    box-sizing: border-box;
    background-color: var(--azul-mais-escuro);
    z-index: 1001;
  }
`;

const MobileHeaderTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--azul-mais-claro);
  font-family: Arial, sans-serif;
`;

const MobileToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: var(--azul-mais-escuro);
  border: 1px solid var(--azul-mais-claro);
  border-radius: 5px;
  cursor: pointer;
`;

const SideBarTitle = styled.label`
  font-size: 26px;
  font-weight: 700;
  color: var(--azul-mais-claro);
  margin: 0px 10px;
  font-family: Arial, sans-serif;
`;

const SideBarList = styled.ul`
  display: flex;
  flex-direction: column;
  color: black;
  font-size: 20px;
  list-style: none;
  margin: 40px 0px;
  padding: 0px;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const SideBarActions = styled(SideBarList)`
  margin-left: auto;
`;

const BotaoSair = styled.button`
  position: absolute;
  height: 40px;
  background-color: var(--azul-mais-escuro);
  color: var(--azul-mais-claro);
  border: 1px solid var(--azul-mais-claro);
  margin: 10px 0px;
  cursor: pointer;
  bottom: 20px;
  left: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.3s ease;
  border-radius: 10px;

  &:hover {
    color: var(--azul);
    background-color: var(--azul-mais-claro);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: var(--azul-mais-claro);
  margin: 0px 8px;
`;

const SidebarHeaderInternal = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SideBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            <MobileHeader>
                <MobileToggleButton onClick={() => setIsOpen((prev) => !prev)}>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        size="lg"
                        color="var(--azul-mais-claro)"
                    />
                </MobileToggleButton>
                <img src="/src/assets/logo2.jpeg" alt="Logo BlogTech" className="mobile-header-logo" />
                <MobileHeaderTitle>BlogTech</MobileHeaderTitle>
            </MobileHeader>

            <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

            <SideBarContainer $isOpen={isOpen}>
                <SidebarHeaderInternal className="sidebar-header">
                    <img src="/src/assets/logo2.jpeg" alt="Logo BlogTech" className="sidebar-logo" />
                    <SideBarTitle>BlogTech</SideBarTitle>
                </SidebarHeaderInternal>


                <SideBarList>
                    <ButtonSideBar>
                        <UserIcon icon={faHouse} size="lg" />
                        Home
                    </ButtonSideBar>

                    <ButtonSideBar>
                        <UserIcon icon={faClipboard} size="lg" />
                        Posts
                    </ButtonSideBar>

                    <ButtonSideBar>
                        <UserIcon icon={faUsers} size="lg" />
                        Usuários
                    </ButtonSideBar>

                    <ButtonSideBar>
                        <UserIcon icon={faGear} size="lg" />
                        Configurações
                    </ButtonSideBar>
                </SideBarList>

                <div className="barraSair"></div>

                {isLoggedIn && (
                    <SideBarActions>
                        <BotaoSair>
                            <UserIcon icon={faRightFromBracket} size="lg" />
                            Sair
                        </BotaoSair>
                    </SideBarActions>
                )}
            </SideBarContainer>
        </>
    );
};

export default SideBar;