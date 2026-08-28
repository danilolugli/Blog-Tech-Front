import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSideBar from '../ButtonSideBar/ButtonSideBar';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faGear, faHouse, faUsers, faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SideBarContainer = styled.div<{ $isCollapsed: boolean }>`
    width: ${({ $isCollapsed }) => ($isCollapsed ? "5%" : "20%")};
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-family: Merriweather;
    background-color: var(--azul-mais-escuro);
`;

const SideBarTitle = styled.label`
    font-size: 26px;
    font-weight: 700;
    color: var(--azul-mais-claro);
    margin: 30px 10px;
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

const BotaoSair = styled.button<{ $isCollapsed: boolean }>`
    position: absolute;
    width: ${({ $isCollapsed }) => ($isCollapsed ? "1%" : "10%")};
    height: 40px;
    background-color: var(--azul-mais-escuro);
    color: ${({ $isCollapsed }) => ($isCollapsed ? "var(--azul-mais-escuro);" : "var(--azul-mais-claro)")}; 
    border: ${({ $isCollapsed }) => ($isCollapsed ? "none" : "1px solid var(--azul-mais-claro);")}; 
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

const IconButton = styled.button`
    display: flex;
    background-color: var(--azul-mais-escuro);
    border: 1px solid var(--azul-mais-claro);
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 5px;

    &:active {
        transform: scale(0.95);
    }
`;

const SideBar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);  
    const [isLoggedIn, setIsLoggedIn] = useState(true);

        return (
        <SideBarContainer $isCollapsed={isCollapsed}>
            <div>
                <img src="src\assets\logo2.jpeg" alt="Logo BlogTech" className="sidebar-logo" />
                <SideBarTitle>BlogTech</SideBarTitle>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                   <UserIcon icon={faBars} size="lg" color="var(--azul-mais-claro)" />
                </IconButton>
            </div>

            <SideBarList>
                <ButtonSideBar>  
                    <UserIcon icon={faHouse} size="lg" color="var(--azul-mais-claro)" />
                    Home
                </ButtonSideBar>
                  
                <ButtonSideBar>
                    <UserIcon icon={faClipboard} size="lg" color="var(--azul-mais-claro)" />
                    Posts
                </ButtonSideBar>
              
                <ButtonSideBar>
                    <UserIcon icon={faUsers} size="lg" color="var(--azul-mais-claro)" />
                    Usuários
                </ButtonSideBar>
            
                <ButtonSideBar>
                    <UserIcon icon={faGear} size="lg" color="var(--azul-mais-claro)" />
                    Configurações
                </ButtonSideBar>
            </SideBarList>

            <div className="barraSair"></div>

            {isLoggedIn && (
                <SideBarActions>
                    <BotaoSair $isCollapsed={isCollapsed}>
                        <UserIcon icon={faRightFromBracket} size="lg" color="var(--azul-mais-claro)" />
                        Sair
                    </BotaoSair>
                </SideBarActions>
            )}
        </SideBarContainer>
    );
};

export default SideBar;
