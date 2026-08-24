import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSideBar from '../ButtonSideBar/ButtonSideBar';

const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 20%;
    font-family: Merriweather;
    background-color: var(--azul-mais-escuro);
`;

const SideBarTitle = styled.label`
    font-size: 32px;
    font-weight: 700;
    color: var(--azul-mais-claro);
    margin: 30px 0px;
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

const SideBarLink = styled.li`
    margin: 30px;
    cursor: pointer;
`;

const BotaoIcone = styled.button`
    width: 40px;
    height: 40px;
    border: 0;
    margin: 15px;
    cursor: pointer;
    &:hover {
        background-color: #4f46e5;
    }
`;

const BotaoSair = styled.button`
    width: 70px;
    height: 40px;
    padding: 0;
    background-color: #3730a3;
    color: #fafaff;
    border: 0;
    margin: 15px;
    cursor: pointer;&:hover {
        color: #3730a3;
        background-color: #fafaff;
    }
`;

const SideBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

        return (
        <SideBarContainer>
            <SideBarTitle>Blog Tech</SideBarTitle>

            <SideBarList>
             
                    <ButtonSideBar>
                        <img src="C:\Users\jrsdl\Downloads\logo.jpeg" />
                        Home
                    </ButtonSideBar>
                  
                <ButtonSideBar>Posts</ButtonSideBar>
              
                <ButtonSideBar>Usuários</ButtonSideBar>
               
                <ButtonSideBar>Usuários</ButtonSideBar>
           
                <ButtonSideBar>Usuários</ButtonSideBar>
            
                <ButtonSideBar>Configurações</ButtonSideBar>
           
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
