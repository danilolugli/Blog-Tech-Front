import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSideBar from '../ButtonSideBar/ButtonSideBar';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faGear, faHouse, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 20%;
    font-family: Merriweather;
    background-color: var(--azul-mais-escuro);
`;

const SideBarTitle = styled.label`
    font-size: 26px;
    font-weight: 700;
    color: var(--azul-mais-claro);
    margin: 30px 0px;
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
    width: 70px;
    height: 40px;
    padding: 0;
    background-color: #3730a3;
    color: #fafaff;
    border: 0;
    margin: 15px;
    cursor: pointer;
    &:hover {
        color: #3730a3;
        background-color: #fafaff;
    }
`;

const UserIcon = styled(FontAwesomeIcon)`
    color: #var(--azul-mais-claro);
    margin: 0px 8px;
`;

const IconButton = styled.button`
    display: flex;
    background-color: var(--azul);
    border: none;
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 5px;
`;

const SideBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

        return (
        <SideBarContainer>
            <div className="sidebar-header">
                <SideBarTitle>BlogTech</SideBarTitle>
                <IconButton>
                   <UserIcon icon={faBars} size="lg" color="white" />
                </IconButton>

            </div>

            <SideBarList>
                <ButtonSideBar>  
                    <UserIcon icon={faHouse} size="lg" color="white" />
                    Home
                </ButtonSideBar>
                  
                <ButtonSideBar>
                    <UserIcon icon={faClipboard} size="lg" color="white" />
                    Posts
                </ButtonSideBar>
              
                <ButtonSideBar>
                    <UserIcon icon={faUsers} size="lg" color="white" />
                    Usuários
                </ButtonSideBar>
            
                <ButtonSideBar>
                    <UserIcon icon={faGear} size="lg" color="white" />
                    Configurações
                </ButtonSideBar>
           
            </SideBarList>

            {isLoggedIn && (
                <SideBarActions>
                    <img src="" />
                    <BotaoSair>Sair</BotaoSair>
                </SideBarActions>
            )}
        </SideBarContainer>
    );
};

export default SideBar;
